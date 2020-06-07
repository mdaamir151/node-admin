const express = require('express')
const exphbs = require('express-handlebars')
const DBInterface = require('./dbcon/main')
const config = require('./config/db_config')
const path = require('path')
const fs = require('fs')
const script = require('./scripts/tables/main')
const bodyParser = require('body-parser')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')

const dbOptions = {
  user: config.user,
  password: config.password,
  database: config.database,
  host: config.host,
  port: config.port
}
const app = express()
const partialsList = {}
const MAX_PAGE_SIZE = 200
const DEFAULT_PAGE_SIZE = 20
const PAGE_LINK_SIZE = 10
const conn = new DBInterface(config.dbType, dbOptions)
const limiter = rateLimit({ windowMs: 1000, max: 6 })

app.use(express.static('./public'))
app.use(limiter)
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

const settingsSymLink = path.join(__dirname, 'config', 'settings.js')
if (fs.existsSync(settingsSymLink)) fs.unlinkSync(settingsSymLink)
if (fs.existsSync(path.join(__dirname, 'external', 'config', 'settings.js'))) {
  const externalSettings = path.join(__dirname, 'external', 'config', 'settings.js')
  fs.symlinkSync(externalSettings, settingsSymLink)
} else {
  const defaultSettings = path.join(__dirname, 'config', 'settings-default.js')
  fs.symlinkSync(defaultSettings, settingsSymLink)
}

const initializeViewEngine = function () {
  app.engine('hbs', exphbs({ // register hbs engine
    layoutsDir: path.join(__dirname, '/views/layouts'),
    extname: 'hbs',
    defaultLayout: 'default',
    partialsDir: path.join(__dirname, '/views/partials/'),
    helpers: {
      resolve_partial: function (table) {
        if (table == null) return 'root'
        return partialsList[table]
      },
      increment: function (num) {
        return num + 1
      },
      eq: function (str1, str2) {
        return str1 === str2
      }
    }
  }))

  app.set('view engine', 'hbs') // use hbs engine
  app.enable('view cache')
}

const generatePartials = function () {
  const rootPartial = '<table id="root-table">\n' +
                    '{{#each data}}\n' +
                    '<tr><th>Table Name</th><th>Key</th>{{#each columns}}<th>{{this}}</th>{{/each}}</tr>\n' +
                    '<tr><td><a href="table/{{table_name}}">{{table_name}}</a></td><td>{{key}}</td>{{#each column_desc}}<td>{{{this}}}</td>{{/each}}</tr>\n' +
                    '{{/each}}\n' +
                    '</table>'
  fs.writeFileSync(path.join(__dirname, 'views', 'partials', 'root.hbs'), rootPartial, 'utf-8')
  if (config.tables) {
    Object.keys(config.tables).forEach(tableName => {
      const tableProp = config.tables[tableName]
      if (tableProp.accessible) {
        let theader = '<th data-col="serial-no" data-insert="false">#</th>'
        let tdata = '<td class="dt-number" class="serial-no">{{increment @index}}</td>'
        Object.keys(tableProp.columns).forEach(colName => {
          const colProp = tableProp.columns[colName]
          if (!colProp.accessible) return
          let caretUp = '&#9650;'
          let caretDown = '&#9660;'
          theader += `<th data-insert="${colProp.insert}" data-allow_update="${colProp.update}" data-col="${colName}" data-dtype="${colProp.type}" data-default="${colProp.default}" data-nullable="${colProp.nullable}" {{#if (eq sort_col_asc "${colName}")}}class="asc" data-sort="asc"{{else if (eq sort_col_desc "${colName}")}}class="desc" data-sort="desc"{{/if}}><div><span>${colProp.slug}</span><span class="caret">{{#if (eq sort_col_desc "${colName}")}}${caretUp}{{else}}${caretDown}{{/if}}</span></div></th>`
          if (colProp.accessible) tdata += `<td data-update="${colProp.update}" data-col="${colName}" data-dtype="${colProp.type}" class="dt-${colProp.type}"><span>{{${colName}}}</span></td>`
        })
        const partial = `<table id="content-table" data-key="${tableProp.key}" data-update_rows="${tableProp.update_rows}" data-delete_rows="${tableProp.delete_rows}" data-insert_rows="${tableProp.insert_rows}" data-table="${tableName}">\n` +
                        `<tr>${theader}</tr>\n` +
                        `{{#each data}}<tr>${tdata}</tr>{{/each}}\n` +
                        '</table>'
        fs.writeFileSync(path.join(__dirname, 'views', 'partials', tableName + '.hbs'), partial, 'utf-8')
      }
      partialsList[tableName] = tableName
    })
  }
  initializeViewEngine()
}

const promisify = function (tableName, values, key, connection, fn) {
  return new Promise((resolve, reject) => {
    fn(tableName, values, key, connection, resolve, reject)
  })
}

const promisifyNoKey = function (tableName, values, connection, fn) {
  return new Promise((resolve, reject) => {
    fn(tableName, values, connection, resolve, reject)
  })
}

app.get('/', (req, res) => {
  const data = []
  Object.values(config.tables).forEach(val => {
    const row = { table_name: val.slug, key: val.key.join(','), columns: Object.values(val.columns).map(col => col.slug), column_desc: Object.values(val.columns).map(col => `<span>type: ${col.type}</span><span>default: ${col.default}</span>`) }
    data.push(row)
  })
  res.render('data_table', { __table_name: null, title: 'All tables under ' + config.database, data })
})

app.get('/config-script', (req, res) => {
  res.sendFile(path.join(__dirname, 'config', 'settings.js'))
})

app.get('/table/:table', (req, res) => {
  if (!req.params.table) {
    res.status(400).end() // bad request
    return
  }
  let sColName = req.query.sort_by
  let sortOrder = req.query.sort_order
  if (sColName && sortOrder){
    res.cookie('sortOptions', `${req.params.table}--${sColName}--${sortOrder}`, {httpOnly: true, sameSite: 'Strict' })
  } else {
    let sortOptions = req.cookies.sortOptions
    let sarr = []
    if (sortOptions) sarr = sortOptions.split('--')
    if (sarr.length >= 3 && sarr[0] === req.params.table) {
      sColName = sarr[1]
      sortOrder = sarr[2]
    }
  }
  const selectOptions = {
    sort: {column: sColName, order: sortOrder}
  }
  const currentPage = req.query.page || 1
  let pageSize = req.query.pageSize || DEFAULT_PAGE_SIZE
  const pageOffset = (currentPage - 1) * pageSize
  pageSize = Math.min(pageSize, MAX_PAGE_SIZE)
  const accessibleProperties = Object.entries(config.tables[req.params.table].columns).filter(([colName, prop]) => prop.accessible === true).map(([colName, prop]) => colName)
  const rowsPromise = conn.countRows(req.params.table)
  const dataPromise = conn.select(req.params.table, pageOffset, pageSize, accessibleProperties, selectOptions)
  Promise.all([rowsPromise, dataPromise]).then(([numRowsData, data]) => {
    const numRows = numRowsData[0].numRows
    const low = Math.floor((currentPage - 1) / PAGE_LINK_SIZE) * PAGE_LINK_SIZE + 1
    const maxPages = Math.ceil(numRows / pageSize)
    const high = Math.min(low + PAGE_LINK_SIZE - 1, maxPages)
    let showPrev = false
    if (low > PAGE_LINK_SIZE) showPrev = true
    let showNext = false
    if (high < maxPages) showNext = true
    const prevPage = low - 1
    const nextPage = high + 1
    const pages = Array.from({ length: (high - low + 1) }).map((_, i) => low + i)
    const columnsData = config.tables[req.params.table].columns
    Object.freeze(columnsData)
    script.onProcessTableRows(req.params.table, columnsData, data)
    let sort_col_asc = null
    let sort_col_desc = null
    if (sColName && sortOrder && sortOrder.toUpperCase() === 'ASC') sort_col_asc = sColName
      else if (sColName && sortOrder && sortOrder.toUpperCase() === 'DESC') sort_col_desc = sColName
    res.render('data_table', { __table_name: req.params.table, sort_col_asc, sort_col_desc, title: config.tables[req.params.table].slug, pageSize, showPrev, prevPage, showNext, nextPage, pages, currentPage, data })
  }).catch(err => {
    console.error(err)
    const statusCode = err.statusCode || 500
    if (err.message) res.status(statusCode).send(err.message)
    else res.status(statusCode).end()
  })
})

app.post('/update/:table', (req, res) => {
  if (!req.params.table) {
    res.status(400).end() // bad request
    return
  }
  const data = req.body
  const table = req.params.table
  if (!config.tables[table].update_rows) {
    res.status(403).end()
    return
  }
  const columns = config.tables[table].columns

  const keys = Object.keys(data.values)
  for (let i = 0; i < keys.length; ++i) {
    if (!(keys[i] in columns) || !columns[keys[i]].update || !columns[keys[i]].accessible) {
      res.status(403).end()
      return
    }
  }

  const updKey = Object.keys(data.key)
  if (!updKey || !(updKey.length) || updKey.length === 0) {
    res.status(403).end()
    return
  }

  const confKey = config.tables[table].key
  confKey.forEach(k => {
    if (!updKey.includes(k)) {
      res.status(403).end()
    }
  })

  promisify(req.params.table, data.values, data.key, conn, script.preUpdate)
    .then(({ tableName, values, key }) => {
      return promisify(tableName, values, key, conn, script.update)
    }).then(({ tableName, values, key }) => {
      return promisify(tableName, values, key, conn, script.postUpdate)
    }).then(result => {
      const statusCode = result.statusCode || 200
      res.status(statusCode).send(result.data)
    }).catch(err => {
      console.error(err)
      const statusCode = err.statusCode || 405
      if (err.message) res.status(statusCode).send(err.message)
      else res.status(statusCode).end()
    })
})

app.post('/delete/:table', (req, res) => {
  if (!req.params.table) {
    res.status(400).end() // bad request
    return
  }
  const data = req.body
  const table = req.params.table
  if (!config.tables[table].delete_rows) {
    res.status(403).end()
    return
  }

  const updKey = Object.keys(data.key)
  if (!updKey || !(updKey.length) || updKey.length === 0) {
    res.status(403).end()
    return
  }

  const confKey = config.tables[table].key
  confKey.forEach(k => {
    if (!updKey.includes(k)) {
      res.status(403).end()
    }
  })

  promisify(req.params.table, null, data.key, conn, script.preDeleteRow)
    .then(({ tableName, values, key }) => {
      return promisify(tableName, values, key, conn, script.deleteRow)
    }).then(({ tableName, values, key }) => {
      return promisify(tableName, values, key, conn, script.postDeleteRow)
    }).then(result => {
      const statusCode = result.statusCode || 200
      res.status(statusCode).send(result.data)
    }).catch(err => {
      console.error(err)
      const statusCode = err.statusCode || 405
      if (err.message) res.status(statusCode).send(err.message)
      else res.status(statusCode).end()
    })
})

app.post('/insert/:table', (req, res) => {
  if (!req.params.table) {
    res.status(400).end() // bad request
    return
  }
  const data = req.body
  const table = req.params.table
  if (!config.tables[table].insert_rows) {
    res.status(403).end()
    return
  }

  promisifyNoKey(req.params.table, data.values, conn, script.preInsertRow)
    .then(({ tableName, values }) => {
      return promisifyNoKey(tableName, values, conn, script.insertRow)
    }).then(({ tableName, values }) => {
      return promisifyNoKey(tableName, values, conn, script.postInsertRow)
    }).then(result => {
      const statusCode = result.statusCode || 200
      res.status(statusCode).send(result.data)
    }).catch(err => {
      console.error(err)
      const statusCode = err.statusCode || 405
      if (err.message) res.status(statusCode).send(err.message)
      else res.status(statusCode).end()
    })
})

app.get('/*', (req, res) => {
  res.status(404).end()
})

app.post('/*', (req, res) => {
  res.status(404).end()
})

const init = function () {
  generatePartials()
  return app
}

module.exports = { init }

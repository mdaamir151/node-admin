const express = require('express')
const exphbs  = require('express-handlebars')
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
  port: config.port,
}
const app = express()
const partialsList = {}
const MAX_PAGE_SIZE = 200
const DEFAULT_PAGE_SIZE = 20
const PAGE_LINK_SIZE = 10
const conn = new DBInterface(config.dbType, dbOptions)
const limiter = rateLimit({ windowMs: 1000, max: 6})

app.use(express.static('./public'))
app.use(limiter)
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let settingsSymLink = path.join(__dirname, 'config', 'settings.js')
if (fs.existsSync(settingsSymLink)) fs.unlinkSync(settingsSymLink)
if (fs.existsSync(path.join(__dirname, 'external', 'config', 'settings.js'))) {
  let externalSettings = path.join(__dirname, 'external', 'config', 'settings.js')
  fs.symlinkSync(externalSettings, settingsSymLink)
} else {
  let defaultSettings = path.join(__dirname, 'config', 'settings-default.js')
  fs.symlinkSync(defaultSettings, settingsSymLink)
}


const initializeViewEngine = function() {
  app.engine('hbs', exphbs({ //register hbs engine
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'default',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
      resolve_partial: function(table) {
        if (table == null) return 'root'
        return partialsList[table]
      },
      increment: function(num) {
        return num + 1
      }
    }
  }))

  app.set('view engine', 'hbs') //use hbs engine
  app.enable('view cache')
}

const generatePartials = function() {
  let rootPartial = `<table id="root-table">\n`+
                    `{{#each data}}\n`+
                    `<tr><th>Table Name</th><th>Key</th>{{#each columns}}<th>{{this}}</th>{{/each}}</tr>\n`+
                    `<tr><td><a href="table/{{table_name}}">{{table_name}}</a></td><td>{{key}}</td>{{#each column_desc}}<td>{{{this}}}</td>{{/each}}</tr>\n`+
                    `{{/each}}\n`+
                    `</table>`
  fs.writeFileSync(path.join(__dirname, 'views', 'partials', 'root.hbs'), rootPartial, 'utf-8')
  if (config.tables) {
    Object.keys(config.tables).forEach(tableName=>{
      let tableProp = config.tables[tableName]
      if (tableProp.accessible) {
        let theader = '<th data-col="serial-no" data-insert="false">#</th>'
        let tdata = '<td class="dt-number" class="serial-no">{{increment @index}}</td>'
        Object.keys(tableProp.columns).forEach(colName=>{
          let colProp = tableProp.columns[colName]
          theader += `<th data-insert="${colProp.insert}" data-allow_update="${colProp.update}" data-col="${colName}" data-dtype="${colProp.type}" data-default="${colProp.default}" data-nullable="${colProp.nullable}">${colProp.slug}</th>`
          if (colProp.accessible) tdata += `<td data-update="${colProp.update}" data-col="${colName}" data-dtype="${colProp.type}" class="dt-${colProp.type}"><span>{{${colName}}}</span></td>`
        })
        let partial = `<table id="content-table" data-key="${tableProp.key}" data-update_rows="${tableProp.update_rows}" data-delete_rows="${tableProp.delete_rows}" data-insert_rows="${tableProp.insert_rows}" data-table="${tableName}">\n`+
                        `<tr>${theader}</tr>\n`+
                        `{{#each data}}<tr>${tdata}</tr>{{/each}}\n`+
                        '</table>'
        fs.writeFileSync(path.join(__dirname, 'views', 'partials', tableName + '.hbs'), partial, 'utf-8')
      }
      partialsList[tableName] = tableName
    })
  }
  initializeViewEngine()
}

const promisify = function(tableName, values, key, connection, fn) {
  return new Promise((resolve, reject)=>{
    fn(tableName, values, key, connection, resolve, reject)
  })
}

app.get('/', (req, res)=>{
  let data = []
  Object.values(config.tables).forEach(val=>{
    let row = {table_name: val.slug, key: val.key.join(","), columns: Object.values(val.columns).map(col=>col.slug), column_desc: Object.values(val.columns).map(col=>`<span>type: ${col.type}</span><span>default: ${col.default_value}</span>`)}
    data.push(row)
  })
  res.render('data_table', {__table_name: null, title: 'All tables under ' + config.database, data})
})

app.get('/config-script', (req, res)=>{
  res.sendFile(path.join(__dirname, 'config', 'settings.js'))
})

app.get('/table/:table', (req, res)=>{
  if (!req.params.table){
    res.status(400).end() //bad request
    return
  }
  let currentPage = req.query.page || 1
  let pageSize = req.query.pageSize || DEFAULT_PAGE_SIZE
  let pageOffset = (currentPage -1) * pageSize
  pageSize = Math.min(pageSize, MAX_PAGE_SIZE)
  let accessibleProperties = Object.entries(config.tables[req.params.table].columns).filter(([colName, prop])=>prop.accessible === true).map(([colName, prop])=>colName)
  let rowsPromise = conn.countRows(req.params.table)
  let dataPromise = conn.select(req.params.table, pageOffset, pageSize, accessibleProperties)
  Promise.all([rowsPromise, dataPromise]).then(([numRowsData, data])=>{
    let numRows = numRowsData[0].numRows
    let low = Math.floor((currentPage - 1) / PAGE_LINK_SIZE) * PAGE_LINK_SIZE + 1
    let maxPages = Math.ceil(numRows / pageSize)
    let high = Math.min(low + PAGE_LINK_SIZE - 1, maxPages)
    let showPrev = false
    if (low > PAGE_LINK_SIZE) showPrev = true
    let showNext = false
    if (high < maxPages) showNext = true
    let prevPage = low - 1
    let nextPage = high + 1
    let pages = Array.from({length: (high - low + 1)}).map((_,i)=>low+i)
    let columnsData = config.tables[req.params.table].columns
    Object.freeze(columnsData)
    script.onProcessTableRows(req.params.table, columnsData, data)
    res.render('data_table', {__table_name: req.params.table, title: config.tables[req.params.table].slug, pageSize, showPrev, prevPage, showNext, nextPage, pages, currentPage, data})
  }).catch(err=>{
    console.error(err)
    let statusCode = err.statusCode || 500
    if (err.message) res.status(statusCode).send(err.message)
    else res.status(statusCode).end()
  })
})

app.post('/update/:table', (req, res)=>{
  if (!req.params.table){
    res.status(400).end() //bad request
    return
  }
  let data = req.body
  let table = req.params.table
  if (!config.tables[table].update_rows) {
    res.status(403).end()
    return
  }
  let columns = config.tables[table].columns

  let keys = Object.keys(data.values)
  for(let i=0; i<keys.length; ++i) {
    if (!(keys[i] in columns) || !columns[keys[i]].update || !columns[keys[i]].accessible) {
      res.status(403).end()
      return
    }
  }

  let updKey = Object.keys(data.key)
  if (!updKey || !(updKey.length) || updKey.length === 0) {
    res.status(403).end()
    return
  }

  let confKey = config.tables[table].key
  confKey.forEach(k=>{
    if (!updKey.includes(k)) {
      res.status(403).end()
      return
    }
  })

  promisify(req.params.table, data.values, data.key, conn, script.preUpdate)
  .then(({tableName, values, key})=>{
    return promisify(tableName, values, key, conn, script.update)
  }).then(({tableName, values, key})=>{
    return promisify(tableName, values, key, conn, script.postUpdate)
  }).then(result=>{
    let statusCode = result.statusCode || 200
    res.status(statusCode).send(result.data)
  }).catch(err=>{
    console.error(err)
    let statusCode = err.statusCode || 405
    if (err.message) res.status(statusCode).send(err.message)
    else res.status(statusCode).end()
  })
})

app.post('/delete/:table', (req, res)=>{
  if (!req.params.table){
    res.status(400).end() //bad request
    return
  }
  let data = req.body
  let table = req.params.table
  if (!config.tables[table].delete_rows) {
    res.status(403).end()
    return
  }

  let updKey = Object.keys(data.key)
  if (!updKey || !(updKey.length) || updKey.length === 0) {
    res.status(403).end()
    return
  }

  let confKey = config.tables[table].key
  confKey.forEach(k=>{
    if (!updKey.includes(k)) {
      res.status(403).end()
      return
    }
  })

  promisify(req.params.table, null, data.key, conn, script.preDeleteRow)
  .then(({tableName, values, key})=>{
    return promisify(tableName, values, key, conn, script.deleteRow)
  }).then(({tableName, values, key})=>{
    return promisify(tableName, values, key, conn, script.postDeleteRow)
  }).then(result=>{
    let statusCode = result.statusCode || 200
    res.status(statusCode).send(result.data)
  }).catch(err=>{
    console.error(err)
    let statusCode = err.statusCode || 405
    if (err.message) res.status(statusCode).send(err.message)
    else res.status(statusCode).end()
  })
})


app.post('/add/:table', (req, res)=>{
  if (!req.params.table){
    res.status(400).end() //bad request
    return
  }
  let data = req.body
  let table = req.params.table
  if (!config.tables[table].delete_rows) {
    res.status(403).end()
    return
  }

  promisify(req.params.table, null, data.key, conn, script.preInsertRow)
  .then(({tableName, values, key})=>{
    return promisify(tableName, values, key, conn, script.insertRow)
  }).then(({tableName, values, key})=>{
    return promisify(tableName, values, key, conn, script.postInsertRow)
  }).then(result=>{
    let statusCode = result.statusCode || 200
    res.status(statusCode).send(result.data)
  }).catch(err=>{
    console.error(err)
    let statusCode = err.statusCode || 405
    if (err.message) res.status(statusCode).send(err.message)
    else res.status(statusCode).end()
  })
})


app.get('/*', (req, res)=>{
  res.status(404).end()
})

app.post('/*', (req, res)=>{
  res.status(404).end()
})

const init = function() {
  generatePartials()
  return app
}

module.exports = { init }
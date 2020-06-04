const express = require('express')
const exphbs  = require('express-handlebars')
const db = require('./dbcon/main')
const config = require('./config/db_config')
const path = require('path')
const fs = require('fs')
const script = require('./scripts/main')
const bodyParser = require('body-parser')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')

const app = express()
const partialsList = {}
const MAX_PAGE_SIZE = 200
const DEFAULT_PAGE_SIZE = 20
const PAGE_LINK_SIZE = 10

initializeViewEngine = function() {
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

generatePartials = function() {
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
        let theader = '<th>#</th>'
        Object.values(tableProp.columns).forEach(colProp=>{
          if (colProp.accessible) theader += `<th>${colProp.slug}</th>`
        })
        let tdata = '<td>{{increment @index}}</td>'
        Object.keys(tableProp.columns).forEach(colName=>{
          let colProp = tableProp.columns[colName]
          if (colProp.accessible) tdata += `<td data-update="${colProp.update}" data-col="${colName}" data-dtype="${colProp.type}"><span>{{${colName}}}</span></td>`
        })
        let partial = `<table id="content-table" data-key="${tableProp.key}" data-update_rows="${tableProp.update_rows}" data-table="${tableName}">\n`+
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

const dbOptions = {
  user: config.user,
  password: config.password,
  database: config.database,
  host: config.host,
  port: config.port,
}

const conn = db.getDB('mysql', dbOptions)

app.use(express.static('./public'))
const limiter = rateLimit({
  windowMs: 1000,
  max: 2
})
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res)=>{
  let data = []
  Object.values(config.tables).forEach(val=>{
    let row = {table_name: val.slug, key: val.key.join(","), columns: Object.values(val.columns).map(col=>col.slug), column_desc: Object.values(val.columns).map(col=>`<span>type: ${col.type}</span><span>default: ${col.default_value}</span>`)}
    data.push(row)
  })
  res.render('data_table', {__table_name: null, title: 'All tables under ' + config.database, data})
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
    res.render('data_table', {__table_name: req.params.table, title: config.tables[req.params.table].slug, pageSize, showPrev, prevPage, showNext, nextPage, pages, currentPage, data})
  }).catch(err=>{
    console.log(err)
    res.status(500).end()
  })
})

app.post('/update/:table', (req, res)=>{
  if (!req.params.table){
    res.status(400).end() //bad request
    return
  }
  let data = req.body
  let table = req.params.table
  let update = true
  if (script.beforeUpdate) {
    if (!script.beforeUpdate(table, data)) {
      update = false
    }
  }
  if (!config.tables[table].update_rows) {
    res.status(403).end()
    return
  }
  let columns = config.tables[table].columns

  let keys = Object.keys(data.values)
  for(let i=0; i<keys.length; ++i) {
    if (!(keys[i] in columns) || !columns[keys[i]].update) {
      res.status(403).end()
      return
    }
  }
  
  if (update) {
    conn.update(table, data.values, data.key).then(_=>{
      res.send(data)
    }).catch(err=>{
      console.log(err)
      if (err.message) res.status(405).send(err.message)
      else res.status(500).end()
    })
  } else {
    if (data.message) res.status(405).send(data.message)
    else res.status(405).end()
  }
})

app.get('/*', (req, res)=>{
  res.status(404).end()
})

app.post('/*', (req, res)=>{
  res.status(404).end()
})

init = function() {
  generatePartials()
  return app
}

module.exports = { init }
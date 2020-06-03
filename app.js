const express = require('express')
const exphbs  = require('express-handlebars')
const db = require('./dbcon/main')
const config = require('./config/db_config')
const path = require('path')
const fs = require('fs')

const app = express()
const partialsList = {}

initializeViewEngine = function() {
  app.engine('hbs', exphbs({ //register hbs engine
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'default',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
      resolve_partial: function(table) {
        if (table == null) return 'root'
        return 'root'
      }
    }
  }))

  app.set('view engine', 'hbs') //use hbs engine
  app.enable('view cache')
}

generatePartials = function() {
  let rootPartial = `<table id="content-table" data-editable="false">\n`+
                    `{{#each data}}\n`+
                    `<tr><th>Table Name</th><th>Key</th>{{#each columns}}<th>{{this}}</th>{{/each}}</tr>\n`+
                    `<tr><td>{{table_name}}</td><td>{{key}}</td>{{#each column_desc}}<td>{{{this}}}</td>{{/each}}</tr>\n`+
                    `{{/each}}\n`+
                    `</table>`
  fs.writeFileSync(path.join(__dirname, 'views', 'partials', 'root.hbs'), rootPartial, 'utf-8')
  partialsList['root'] = 'root'
  if (config._tables) {
    Object.keys(config._tables).forEach(tableName=>{
      let tableProp = config._tables[tableName]
      if (tableProp.accessible) {
        let theader = ''
        Object.values(tableProp.columns).forEach(colProp=>{
          if (colProp.accessible) theader += `<th>${colProp.slug}</th>`
        })
        let tdata = ''
        Object.keys(tableProp.columns).forEach(colName=>{
          let colProp = tableProp.columns[colName]
          if (colProp.accessible) tdata += `<td data-editable="${colProp.editable}">{{data.${colName}}}</td>`
        })
        let partial = `<table id="content-table" data-key="${tableProp.key} data-editable="${tableProp.editable}">\n`+
                        `<tr>${theader}</tr>\n`+
                        `{{#each data}}<tr>${tdata}</tr>{{/data}}\n`+
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

app.get('/', (req, res)=>{
  let data = []
  Object.values(config.tables).forEach(val=>{
    let row = {table_name: val.slug, key: val.key.join(","), columns: Object.values(val.columns).map(col=>col.slug), column_desc: Object.values(val.columns).map(col=>`<span>type: ${col.type}</span><span>default: ${col.default_value}</span>`)}
    data.push(row)
  })
  res.render('data_table', {__table_name: null, data})
})

app.use(express.static('./public'))

init = function() {
  generatePartials()
  return app
}

module.exports = { init }
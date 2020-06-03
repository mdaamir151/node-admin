const fs = require('fs')
const db = require('./dbcon/main')
const path = require('path')

if (process.argv.length < 3) {
  throw Error('Config file is required to proceed')
}
const confFilePath = process.argv[2]
const config = fs.readFileSync(confFilePath, 'utf-8')
const confJson = JSON.parse(config)

const dbOptions = {
  user: confJson.user,
  password: confJson.password,
  database: confJson.database,
  host: confJson.host,
  port: confJson.port,
  onError: function (err) {
    throw err
  }
}

const conn = db.getDB('mysql', dbOptions)
const data = {}
Object.assign(data, dbOptions)
let allTables = []
conn.getTables().then(tables => {
  allTables = tables
  const promises = []
  tables.forEach(table => {
    promises.push(conn.describeTable(table))
  })
  return Promise.all(promises)
}).then(tableDescriptions => {
  const tables = {}
  let iter = -1
  tableDescriptions.forEach(description => {
    iter++
    const tableName = allTables[iter]
    tables[tableName] = { accessible: true, editable: true, slug: tableName }
    const columns = {}
    const pk = []
    const uk = []
    description.forEach(row => {
      columns[row.Field] = { accessible: true, editable: true, slug: row.Field, type: row.Type, default_value: row.Default }
      if (row.Key && row.Key === 'PRI') pk.push(row.Field)
      if (row.Key && row.Key === 'UNI') uk.push(row.Field)
    })
    tables[tableName].columns = columns
    if (pk.length > 0) tables[tableName].key = pk
    else tables[tableName].key = uk
  })

  data.tables = tables
  let outFile = path.join(__dirname, 'config', 'db_config.js')
  fs.writeFileSync(outFile, 'module.exports = ' + JSON.stringify(data, null, 2))
  console.log('configuration file generated!')
  process.exit()
}).catch(err => {
  console.log(err)
})
const fs = require('fs')
const db = require('./dbcon/main')
const path = require('path')
const extConfig = require('./external/config/main')

const dbOptions = {
  dbType: extConfig.dbType,
  user: extConfig.user,
  password: extConfig.password,
  database: extConfig.database,
  host: extConfig.host,
  port: extConfig.port,
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
    tables[tableName] = { accessible: true, update_rows: true, insert_rows: false, delete_rows: false, slug: tableName }
    const columns = {}
    const pk = []
    const uk = []
    description.forEach(row => {
      columns[row.Field] = { accessible: true, update: true, delete: false, slug: row.Field, type: row.Type, default_value: row.Default }
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
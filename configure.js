const fs = require('fs')
const DBInterface = require('./dbcon/main')
const path = require('path')
const scripts = require('./scripts/config/main')

if (!fs.existsSync(path.join(__dirname, 'external', 'config', 'main.js'))) {
  console.error('No database config file found. Aborting...')
  process.exit()
}
const extConfig = require('./external/config/main')

const dbOptions = {
  user: extConfig.user,
  password: extConfig.password,
  database: extConfig.database,
  host: extConfig.host,
  port: extConfig.port,
  serverPort: extConfig.serverPort
}

const conn = new DBInterface(extConfig.dbType, dbOptions)
const data = {}
Object.assign(data, dbOptions, { dbType: extConfig.dbType })
let allTables = []
const configure = function (cb) {
  const dtypeMap = conn.getDataTypeMap() || {}
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
      scripts.onTableConfigrationFetched(tableName, description)

      tables[tableName] = { accessible: true, update_rows: true, insert_rows: false, delete_rows: false, slug: tableName }
      const columns = {}
      const pk = []
      const uk = []
      description.forEach(row => {
        columns[row.Field] = { accessible: true, update: true, insert: true, slug: row.Field, type: dtypeMap[row.Type] || dtypeMap._default, otype: row.Type, default: row.Default, nullable: row.Null }
        if (row.Key && row.Key === 'PRI') pk.push(row.Field)
        if (row.Key && row.Key === 'UNI') uk.push(row.Field)
      })
      tables[tableName].columns = columns
      if (pk.length > 0) tables[tableName].key = pk
      else tables[tableName].key = uk
    })
    data.tables = tables
    const outFile = path.join(__dirname, 'external', 'config', 'db_config.js')
    scripts.onWriteConfigFile(data)
    fs.writeFileSync(outFile, 'module.exports = ' + JSON.stringify(data, null, 2))
    const symLinkPath = path.join(__dirname, 'config', 'db_config.js')
    if (fs.existsSync(symLinkPath)) fs.unlinkSync(symLinkPath)
    fs.symlinkSync(outFile, symLinkPath)
    console.log('configuration file generated!')
    if (require.main === module) process.exit()
    if (cb) cb(null)
  }).catch(err => {
    console.error(err)
    if (cb) cb(err)
  })
}

if (require.main === module) configure()

module.exports = configure

const Mysql = require('./mysql')

const supportedDbs = ['mysql']

class DBInterface {
  constructor (type, options) {
    if (!options) throw Error('options required for DB connection')
    else if (type === 'mysql') this.dbConn = new Mysql(options)
    else throw Error('DBs supported : ' + supportedDbs)
  }

  select (table, start, pageSize, properties, options) {
    return this.dbConn.select(table, start, pageSize, properties, options)
  }

  countRows (table) {
    return this.dbConn.countRows(table)
  }

  getTables () {
    return this.dbConn.getTables()
  }

  // tableData format: {Field, Type, Default, Null: true/false, Key}
  describeTable (tableName) {
    return this.dbConn.describeTable(tableName)
  }

  updateRow (tableName, values, key) {
    return this.dbConn.updateRow(tableName, values, key)
  }

  insertRow (tableName, values){
    return this.dbConn.insertRow(tableName, values)
  }

  deleteRow (tableName, key) {
    return this.dbConn.deleteRow(tableName, key)
  }

  rawQuery (queryStr) {
    return this.dbConn.rawQuery(queryStr)
  }

  getDataTypeMap () {
    return this.dbConn.getDataTypeMap()
  }
}

module.exports = DBInterface

const mysql = require('mysql')

//supported types: number, boolean, text, unixtimestamp
const dtypeMapping = {
  'int': 'number',
  'tinyint': 'number',
  'bigint': 'number',
  'smallint': 'number',
  'mediumint': 'number',
  'decimal': 'number',
  'float': 'number',
  'double': 'number',
  'tinyint(1)': 'boolean',
  'unixtimestamp': 'unixtimestamp',
  '_default': 'text'
}

Object.freeze(dtypeMapping)

class DBPool {
  constructor (options) {
    this.pool = mysql.createPool({
      connectionLimit: options.maxConn || 1,
      host: options.host || 'localhost',
      user: options.user,
      password: options.password,
      database: options.database,
      port: options.port
    })

    this.pool.on('error', function (err) {
      if (options.onError) options.error_fn(onError)
      else throw err
    })

    this.pool.on('connection', function (connection) {
      if (options.onConnected) options.onConnected(connection)
    })
  }

  select(table, start, pageSize, properties) {
    const queryStr = `SELECT ${properties} FROM ${table} LIMIT ${start}, ${pageSize}`
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) reject({message: err.sqlMessage, stack: err})
        else resolve(results)
      })
    })
  }

  countRows(table) {
    const queryStr = `SELECT COUNT(*) AS numRows FROM ${table}`
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) reject({message: err.sqlMessage, stack: err})
        else resolve(results)
      })
    })
  }

  getTables() {
    const queryStr = 'SHOW tables'
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) {
          err.message = err.sqlMessage
          reject({message: err.sqlMessage, stack: err})
        }
        else resolve(results.map(v=>Object.values(v)[0]))
      })
    })
  }

  //tableData format: {Field, Type, Default, Null: true/false, Key}
  describeTable(tableName) {
    const queryStr = `DESC ${tableName}`
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) reject({message: err.sqlMessage, stack: err})
        else {
          results.forEach(result=>{
            result.Null = (result.Null === 'YES')? true: false
          })
          resolve(results)
        }
      })
    })
  }

  updateRow(tableName, values, key) {
    let arr = Object.entries(values).map(([k,v])=>k + " = " + this.pool.escape(v))
    let valStr = arr.join(', ')
    arr = Object.entries(key).map(([k,v])=>k + " = " + this.pool.escape(v))
    let conditions = arr.join(' AND ')
    const queryStr = `UPDATE ${tableName} SET ${valStr} WHERE ${conditions}`
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) reject({message: err.sqlMessage, stack: err})
        else resolve(results)
      })
    })
  }

  deleteRow(tableName, key) {
    let arr = Object.entries(key).map(([k,v])=>k + " = " + this.pool.escape(v))
    let conditions = arr.join(' AND ')
    const queryStr = `DELETE FROM ${tableName} WHERE ${conditions} LIMIT 1`
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) reject({message: err.sqlMessage, stack: err})
        else resolve(results)
      })
    })
  }

  rawQuery(queryStr) {
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) reject({message: err.sqlMessage, stack: err})
        else resolve(results)
      })
    })
  }

  getDataTypeMap() {
    return dtypeMapping
  }
}

module.exports = DBPool

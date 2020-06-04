const mysql = require('mysql')

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
        if (err) {
          err.message = err.sqlMessage
          reject(err)
        }
        else resolve(results)
      })
    })
  }

  countRows(table) {
    const queryStr = `SELECT COUNT(*) AS numRows FROM ${table}`
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) {
          err.message = err.sqlMessage
          reject(err)
        }
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
          reject(err)
        }
        else resolve(results.map(v=>Object.values(v)[0]))
      })
    })
  }

  describeTable(tableName) {
    const queryStr = `DESC ${tableName}`
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) {
          err.message = err.sqlMessage
          reject(err)
        }
        else resolve(results)
      })
    })
  }

  update(tableName, values, key) {
    let arr = Object.entries(values).map(([k,v])=>k + " = " + this.pool.escape(v))
    let valStr = arr.join(', ')
    arr = Object.entries(key).map(([k,v])=>k + " = " + this.pool.escape(v))
    let conditions = arr.join(' AND ')
    const queryStr = `UPDATE ${tableName} SET ${valStr} WHERE ${conditions}`
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) {
          err.message = err.sqlMessage //TODO: unable to assign to err.message
          reject(err)
        }
        else resolve(results)
      })
    })
  }
}

module.exports = DBPool

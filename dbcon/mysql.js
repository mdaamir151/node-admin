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
        if (err) reject(err)
        else resolve(results)
      })
    })
  }

  getTables() {
    const queryStr = 'SHOW tables'
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) reject(err)
        else resolve(results.map(v=>Object.values(v)[0]))
      })
    })
  }

  describeTable(tableName) {
    const queryStr = `DESC ${tableName}`
    const that = this
    return new Promise((resolve, reject)=>{
      that.pool.query(queryStr, null, (err, results)=>{
        if (err) reject(err)
        else resolve(results)
      })
    })
  }
}

module.exports = DBPool

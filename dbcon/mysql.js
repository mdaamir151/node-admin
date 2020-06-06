const mysql = require('mysql')

// supported types: number, boolean, text, unixtimestamp
const dtypeMapping = {
  int: 'number',
  tinyint: 'number',
  bigint: 'number',
  smallint: 'number',
  mediumint: 'number',
  decimal: 'number',
  float: 'number',
  double: 'number',
  'tinyint(1)': 'boolean',
  unixtimestamp: 'unixtimestamp',
  _default: 'text'
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
      throw err
    })

    this.pool.on('connection', function (connection) {
      if (options.onConnected) options.onConnected(connection)
    })
  }

  select (table, start, pageSize, properties, options) {
    let queryStr = `SELECT ${properties} FROM ${table} LIMIT ${start}, ${pageSize}`
    if (options && options.sort && options.sort.column) {
      let so = options.sort.order
      let order = null
      if (so && so.toUpperCase() === 'ASC') order = 'ASC'
      else if (so && so.toUpperCase() === 'DESC') order = 'DESC'
      if (order) {
        queryStr = `SELECT ${properties} FROM ${table} ORDER BY ${options.sort.column} ${order} LIMIT ${start}, ${pageSize}`
      }
    }
    const that = this
    return new Promise((resolve, reject) => {
      that.pool.query(queryStr, null, (err, results) => {
        if (err) reject({ message: err.sqlMessage, stack: err })
        else resolve(results)
      })
    })
  }

  countRows (table) {
    const queryStr = `SELECT COUNT(*) AS numRows FROM ${table}`
    const that = this
    return new Promise((resolve, reject) => {
      that.pool.query(queryStr, null, (err, results) => {
        if (err) reject({ message: err.sqlMessage, stack: err })
        else resolve(results)
      })
    })
  }

  getTables () {
    const queryStr = 'SHOW tables'
    const that = this
    return new Promise((resolve, reject) => {
      that.pool.query(queryStr, null, (err, results) => {
        if (err) {
          err.message = err.sqlMessage
          reject({ message: err.sqlMessage, stack: err })
        } else resolve(results.map(v => Object.values(v)[0]))
      })
    })
  }

  // tableData format: {Field, Type, Default, Null: true/false, Key}
  describeTable (tableName) {
    const queryStr = `DESC ${tableName}`
    const that = this
    return new Promise((resolve, reject) => {
      that.pool.query(queryStr, null, (err, results) => {
        if (err) reject({ message: err.sqlMessage, stack: err })
        else {
          results.forEach(result => {
            result.Null = (result.Null === 'YES')
          })
          resolve(results)
        }
      })
    })
  }

  updateRow (tableName, values, key) {
    let arr = Object.entries(values).map(([k, v]) => k + ' = ' + this.pool.escape(v))
    const valStr = arr.join(', ')
    arr = Object.entries(key).map(([k, v]) => k + ' = ' + this.pool.escape(v))
    const conditions = arr.join(' AND ')
    const queryStr = `UPDATE ${tableName} SET ${valStr} WHERE ${conditions}`
    const that = this
    return new Promise((resolve, reject) => {
      that.pool.query(queryStr, null, (err, results) => {
        if (err) reject({ message: err.sqlMessage, stack: err })
        else resolve(results)
      })
    })
  }

  insertRow (tableName, values) {
    const keyArr = []
    const valueArr = []
    Object.entries(values).forEach(([k,v])=>{
      keyArr.push(this.pool.escape(k))
      valueArr.push(this.pool.escape(v))
    })
    const cols = keyArr.join(', ').replace(/'/g, '')
    const vals = valueArr.join(', ')
    const queryStr = `INSERT INTO ${tableName}(${cols}) VALUES(${vals})`
    const that = this
    return new Promise((resolve, reject) => {
      that.pool.query(queryStr, null, (err, results) => {
        if (err) reject({ message: err.sqlMessage, stack: err })
        else resolve(results)
      })
    })
  }

  deleteRow (tableName, key) {
    const arr = Object.entries(key).map(([k, v]) => k + ' = ' + this.pool.escape(v))
    const conditions = arr.join(' AND ')
    const queryStr = `DELETE FROM ${tableName} WHERE ${conditions} LIMIT 1`
    const that = this
    return new Promise((resolve, reject) => {
      that.pool.query(queryStr, null, (err, results) => {
        if (err) reject({ message: err.sqlMessage, stack: err })
        else resolve(results)
      })
    })
  }

  rawQuery (queryStr) {
    const that = this
    return new Promise((resolve, reject) => {
      that.pool.query(queryStr, null, (err, results) => {
        if (err) reject({ message: err.sqlMessage, stack: err })
        else resolve(results)
      })
    })
  }

  getDataTypeMap () {
    return dtypeMapping
  }
}

module.exports = DBPool

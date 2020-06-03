const mysql = require('./mysql')

const supportedDbs = ['mysql']

const getDB = function(type, options) {
  if (!options) throw Error('options required for DB connection')
  else if (type === 'mysql') return new mysql(options)
  else throw Error('DBs supported : ' + supportedDbs)
}

module.exports = {
	getDB
}
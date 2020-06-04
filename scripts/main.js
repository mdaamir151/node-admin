
/*
* Methods available on @connection are
* select(table, start, pageSize, properties)
* countRows(table)
* getTables()
* describeTable(tableName)
* update(tableName, values, key)
* rawQuery(queryString)
*
* All methods return promises
*/

const extScript = require('../external/scripts/main')

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @update method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const preUpdate = function(tableName, values, key, connection, resolve, reject) {
  if (extScript.preUpdate) extScript.preUpdate(tableName, values, key, connection, resolve, reject)
  else resolve({tableName, values, key})
}

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @postUpdate method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const update = function(tableName, values, key, connection, resolve, reject) {
  if (extScript.update) extScript.update(tableName, values, key, connection, resolve, reject)
  else {
    connection.update(tableName, values, key)
    .then(result=>resolve({tableName, values, key}))
    .catch(err=>reject(err))
  }
}

/*
* resolve with {statusCode: <default 200>, data: <json to be sent>}
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const postUpdate = function(tableName, values, key, connection, resolve, reject) {
  if (extScript.postUpdate) extScript.postUpdate(tableName, values, key, connection, resolve, reject)
  else resolve({statusCode: 200, data: values})
}

module.exports = { preUpdate, update, postUpdate}
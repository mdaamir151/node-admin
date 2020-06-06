
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

const extScript = require('../../external/scripts/tables/main')

/*
* modify data if needed before displaying to user, like transforming data according to types, adding new columns, etc.
* columnData is read-only
*/
const onProcessTableRows = function (tableName, columnData, data) {
  if (extScript.onProcessTableRows) extScript.onProcessTableRows(tableName, columnData, data)
}

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @update method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const preUpdate = function (tableName, values, key, connection, resolve, reject) {
  if (extScript.preUpdate) extScript.preUpdate(tableName, values, key, connection, resolve, reject)
  else resolve({ tableName, values, key })
}

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @postUpdate method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const update = function (tableName, values, key, connection, resolve, reject) {
  if (extScript.update) extScript.update(tableName, values, key, connection, resolve, reject)
  else {
    connection.updateRow(tableName, values, key)
      .then(result => resolve({ tableName, values, key }))
      .catch(err => reject(err))
  }
}

/*
* resolve with {statusCode: <default 200>, data: <json to be sent>}
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const postUpdate = function (tableName, values, key, connection, resolve, reject) {
  if (extScript.postUpdate) extScript.postUpdate(tableName, values, key, connection, resolve, reject)
  else resolve({ statusCode: 200, data: values })
}

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @update method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const preDeleteRow = function (tableName, values, key, connection, resolve, reject) {
  if (extScript.preDeleteRow) extScript.preDeleteRow(tableName, values, key, connection, resolve, reject)
  else resolve({ tableName, values, key })
}

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @postUpdate method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const deleteRow = function (tableName, values, key, connection, resolve, reject) {
  if (extScript.deleteRow) extScript.deleteRow(tableName, values, key, connection, resolve, reject)
  else {
    connection.deleteRow(tableName, key)
      .then(result => resolve({ tableName, values, key }))
      .catch(err => reject(err))
  }
}

/*
* resolve with {statusCode: <default 200>, data: <json to be sent>}
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const postDeleteRow = function (tableName, values, key, connection, resolve, reject) {
  if (extScript.postDeleteRow) extScript.postDeleteRow(tableName, values, key, connection, resolve, reject)
  else resolve({ statusCode: 200, data: values })
}

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @update method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const preInsertRow = function (tableName, values, key, connection, resolve, reject) {
  if (extScript.preInsertRow) extScript.preInsertRow(tableName, values, key, connection, resolve, reject)
  else resolve({ tableName, values, key })
}

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @postUpdate method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const insertRow = function (tableName, values, key, connection, resolve, reject) {
  if (extScript.insertRow) extScript.insertRow(tableName, values, key, connection, resolve, reject)
  else {
    connection.insertRow(tableName, key)
      .then(result => resolve({ tableName, values, key }))
      .catch(err => reject(err))
  }
}

/*
* resolve with {statusCode: <default 200>, data: <json to be sent>}
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const postInsertRow = function (tableName, values, key, connection, resolve, reject) {
  if (extScript.postInsertRow) extScript.postInsertRow(tableName, values, key, connection, resolve, reject)
  else resolve({ statusCode: 200, data: values })
}

module.exports = { onProcessTableRows, preUpdate, update, postUpdate, preDeleteRow, deleteRow, postDeleteRow, preInsertRow, insertRow, postInsertRow }

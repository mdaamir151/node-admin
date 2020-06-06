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

/*
* modify data if needed before displaying to user, like transforming data according to types, adding new columns, etc.
* columnData is read-only
*/
const onProcessTableRows = function(tableName, columnData, data) {
  data.forEach(row=>{
    Object.entries(row).forEach(([columnName, val])=>{
      if (columnData[columnName].type.startsWith('boolean')) row[columnName] = val > 0? true: false
      columnData[columnName] = 'testing'
    })
  })
}

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @update method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const preUpdate = function(tableName, values, key, connection, resolve, reject) {
  // your code here
}

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @postUpdate method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const update = function(tableName, values, key, connection, resolve, reject) {
  // your code here
}

/*
* resolve with {statusCode: <default 200>, data: <json to be sent>}
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const postUpdate = function(tableName, values, key, connection, resolve, reject) {
  // your code here
}


/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @update method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const preDeleteRow = function(tableName, values, key, connection, resolve, reject) {
  // your code here
}

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @postUpdate method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const deleteRow = function(tableName, values, key, connection, resolve, reject) {
  // your code here
}

/*
* resolve with {statusCode: <default 200>, data: <json to be sent>}
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const postDeleteRow = function(tableName, values, key, connection, resolve, reject) {
  // your code here
}


/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @update method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const preInsertRow = function(tableName, values, key, connection, resolve, reject) {
  // your code here
}

/*
* resolve with {tableName: <affected table>, values: <value to be passed>, key: <key to be passed>} to be passed on to @postUpdate method
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const insertRow = function(tableName, values, key, connection, resolve, reject) {
  // your code here
}

/*
* resolve with {statusCode: <default 200>, data: <json to be sent>}
* reject with {statusCode: <default 405>, message: <string message>, stack: <error stack to print>}
*/
const postInsertRow = function(tableName, values, key, connection, resolve, reject) {
  // your code here
}



module.exports = { onProcessTableRows, /*preUpdate,*/ /*update,*/ /*postUpdate,*/ /*preDeleteRow,*/ /*deleteRow,*/ /*postDeleteRow,*/ /*preInsertRow,*/ /*insertRow,*/ /*postInsertRow*/} //uncomment functions implemented
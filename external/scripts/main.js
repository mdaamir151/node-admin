
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



module.exports = { /*preUpdate,*/ /*update,*/ /*postUpdate*/} //uncomment functions implemented
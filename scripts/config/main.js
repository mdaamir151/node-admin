const extScript = require('../../external/scripts/config/main')

/*
* tableData format: {Field, Type, Default, Null, Key}
* key is considered only if it is 'UNI' key or 'PRI' key, else it is ignored
*/
const onTableConfigrationFetched = function (tableName, columnsData) {
  if (extScript.onTableConfigrationFetched) extScript.onTableConfigrationFetched(tableName, columnsData)
}

/*
* defaultConfig format
*{
*  dbType: extConfig.dbType,
*  user: extConfig.user,
*  password: extConfig.password,
*  database: extConfig.database,
*  host: extConfig.host,
*  port: extConfig.port,
*  serverPort: extConfig.serverPort,
*  <tableName>: {
*    accessible: true,
*    update_rows: true,
*    insert_rows: false,
*    delete_rows: false,
*    slug: <tableName>,
*    columns: {
*      <column-name>: { accessible: true, update: true, slug: <column-name>, type: <column-datatype>, default_value: <column-defaultVal> }
*    },
*    key: [<key1>, <key2>, ...]
*  }
*}
*/
const onWriteConfigFile = function (defaultConfig) {
  if (extScript.onWriteConfigFile) extScript.onWriteConfigFile(defaultConfig)
}

module.exports = { onTableConfigrationFetched, onWriteConfigFile }

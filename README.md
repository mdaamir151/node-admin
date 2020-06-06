# node-admin
Admin Panel for Express
> Built in support for mysql but can be extended easily to other databases

## Quick setup
1. clone and cd to first level directory
2. install required packages using npm
> npm install
3. set up database credentials in external/config/main
4. run admin server
> npm start
5. Browse to http://localhost:\<serverPort in config file (default: 5000)>/  

To re generate configuration file for database at any time
> node configure.js

## Restricting Access and updates to database
Configuration file can be found under scripts/ directory.
Set appropriate flags on table and columns.\
Supported flags at table level are:
- accessible \- true/false to show and enable or hide and disable table
- insert_rows \- true to allow inserting new rows, false to disallow
- update_rows \- true to allow update on rows, false to disallow
- delete_rows \- true to allow deleting rows, false to disallow


At column level supported flags are:
- accessible \- true/false to show and enable or hide and disable column
- update \- true to allow updating colum, false to disallow
- insert \- true to allow setting colum value during insert, false to disallow

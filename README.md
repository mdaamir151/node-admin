# node-admin
Admin Panel for Express
> Built in support for mysql but can be extended easily to other databases

## Quick setup
1. clone and cd to first level directory
2. install required packages using npm
> npm install
3. set up database credentials in external/config/main
4. generate configuration file for database
> node configure.js
5. run admin server
> node server.js
6. Browse to http:localhost:\<port\>/

## Restricting Access and updates to database
Configuration file can be found under scripts/ directory.
Set appropriate flags on table and columns.\
Supported Flags are:
- accessible \- true/false to show and enable or hide and disable column
- update \- true to allow update, false to disallow

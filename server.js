const express = require('express')
const fs = require('fs')
const { exec } = require("child_process")
const prompt = require('prompt-sync')()
const path = require('path')

const startServer = function() {
  const servelet = require('./app')
  let { serverPort } = require('./config/db_config')
  const app = express()
  app.use(servelet.init())
  serverPort = serverPort || 5000
  app.listen(serverPort, err=>{
    if (err) console.log(err)
    else console.log('server running on port '+serverPort)
  })
}

if (!fs.existsSync(path.join(__dirname, 'config', 'db_config.js'))) {
  let ans = prompt('No configuration file found. Generate?(y|N): ')
  if (ans === 'y') {
    const configure = require('./configure')
    configure((err)=>{
      if (err) throw err
      else startServer()
    })
  } else {
    console.error('Cannot proceed without configuration file. Aborting...')
    process.exit()
  }
} else {
  startServer()
}
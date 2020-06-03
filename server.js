const express = require('express')
const servelet = require('./app')

const app = express()
app.use(servelet.init())

app.listen(5000, err=>{
  if (err) console.log(err)
  else console.log('server running on port 5000')
})
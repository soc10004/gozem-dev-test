const fs = require('fs');
const path = require('path');
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config()
const config = require('./config/config')
const routes = require('./routes/routes')
const app = express()
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'gozem-test.log'), { flags: 'a' })
 
app.use(morgan('combined', { stream: accessLogStream }))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', routes)
app.get('/',(req,res)=>{
  res.redirect('/api/get_distance_and_time');
})
app.get('/api',(req,res)=>{
  res.redirect('/api/get_distance_and_time');
})


app.listen(config.server.port, () => {
  console.log(`Thw backend developer business case app start on port ${config.server.port}`)
})

module.exports = app

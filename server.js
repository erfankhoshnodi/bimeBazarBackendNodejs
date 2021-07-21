var express = require('express')
var app = express()
var mongoose = require('mongoose')
var dotenv = require('dotenv/config')
var registers = require('./routes/routeregister')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use('/',registers)



mongoose.connect(process.env.DB_CONNECTION,(err,db) => {
    console.log('db connected')
})

app.listen(3000)
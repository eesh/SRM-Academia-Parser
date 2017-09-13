var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var routes = require('./routes')

const SERVER_PORT = 6345


app.use(bodyParser())
routes(app)

app.listen(SERVER_PORT, () => {
  console.log('Server running on port: ' + SERVER_PORT);
})

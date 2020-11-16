const express = require('express')
const cp = require('cookie-parser')
const passport = require('passport')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./routes')
const errorHandler = require('./errors/handler')
const routeDoesNotExistHandler = require('./errors/routeDoesNotExistHandler')
const logger = require('./logger')


const app = express()

app.use(morgan('dev', { stream: logger.stream }))

app.use(bodyParser.json())

app.use(passport.initialize())
require('./config')(passport)

app.use(cp())

app.use(routes)
app.use(routeDoesNotExistHandler)
app.use(errorHandler)

module.exports = app

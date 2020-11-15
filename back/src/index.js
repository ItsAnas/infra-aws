const mongoose = require('mongoose')
const winston = require('winston')
const dotenv = require('dotenv')
const app = require('./app')
const logger = require('./logger')

const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
  dotenv.config()
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
    handleExceptions: true,
    colorize: true,
  }))
}

const port = process.env.API_PORT || 5000
const address = process.env.API_ADDRESS || 'localhost'

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  logger.info(`Connected to MongoDB on localhost/test`)
  
  app.listen(port, address, () => {
    logger.info(`Server listening on ${address}:${port}`)
  })
})
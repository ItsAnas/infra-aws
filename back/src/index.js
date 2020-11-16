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

const mongoUsername = process.env.MONGO_INITDB_ROOT_USERNAME
const mongoPassword = process.env.MONGO_INITDB_ROOT_PASSWORD
const mongoAddress = process.env.MONGO_ADDRESS
const mongoDatabase = process.env.MONGO_INITDB_DATABASE


mongoose.connect(`mongodb://${mongoUsername}:${mongoPassword}@${mongoAddress}/${mongoDatabase}`, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  logger.info('Connected to MongoDB')

  app.listen(port, address, () => {
    logger.info(`Server listening on ${address}:${port}`)
  })
})

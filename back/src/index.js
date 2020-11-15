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

app.listen(port, address, () => {
  logger.info(`Server listening on ${address}:${port}`)
})

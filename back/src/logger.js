const winston = require('winston')

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
  ],
})

module.exports = logger
module.exports.stream = {
  write: (data) => logger.info(data.slice(0, -1)),
}

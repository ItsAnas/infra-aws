const ApiError = require('./ApiErrors/ApiError')

function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error)
  }
  if (error instanceof ApiError) {
    error.send(response)
  } else {
    response.status(500).json(error.message)
  }
  return next()
}

module.exports = errorHandler

const ApiError = require('./ApiError')

class BadRequestError extends ApiError {
  send(response) {
    super.send(response, 400)
  }
}

module.exports = BadRequestError

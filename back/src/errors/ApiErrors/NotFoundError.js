const ApiError = require('./ApiError')

class NotFoundError extends ApiError {
  send(response) {
    super.send(response, 404)
  }
}

module.exports = NotFoundError

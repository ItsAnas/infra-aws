class ApiError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ApiError'
    Error.captureStackTrace(this, ApiError)
  }

  send(response, status = 500) {
    if (this.message) {
      response.status(status).json(this.message)
    } else {
      response.sendStatus(status)
    }
    return status
  }
}

module.exports = ApiError

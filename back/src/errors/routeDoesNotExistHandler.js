const NotFoundError = require('./ApiErrors/NotFoundError')

function routeDoesNotExistHandler(request) {
  if (!request.route) {
    throw new NotFoundError()
  }
}

module.exports = routeDoesNotExistHandler

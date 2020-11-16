const request = require('supertest')
const app = require('../app')

describe('app tests', () => {
  it('should use the error handler', () => (
    request(app).post('/auth/login')
      .expect(400)
  ))
  it('should use the handler for route does not exist', () => (
    request(app).get('/does-not-exist')
      .expect(404)
  ))
})

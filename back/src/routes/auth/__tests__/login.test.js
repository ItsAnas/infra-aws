const request = require('supertest')
const app = require('../../../app')

describe('login tests', () => {
  describe('GET', () => {
    it('should respond 200 OK to GET requests', async () => (
      request(app)
        .get('/auth/login')
        .expect(200)))
  })
  describe('POST', () => {
    it('should respond 400 "No user provided" if no body in request', () => (
      request(app)
        .post('/auth/login')
        .expect(400, '"No user provided"')))
    it('should respond 200 "logged in user {user}" if body in request', () => (
      request(app)
        .post('/auth/login')
        .send({ user: 'user' })
        .expect(200, '"logged in user user"')))
  })
})

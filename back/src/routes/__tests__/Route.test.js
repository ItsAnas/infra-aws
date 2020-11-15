const mockExpress = () => ({
  use: jest.fn(),
})

const mockRouter = {
  use: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
}

mockExpress.Router = () => mockRouter

jest.mock('express', () => mockExpress)

const NotFoundError = require('../../errors/ApiErrors/NotFoundError')
const Route = require('../Route')

const { routerify } = Route

describe('Route tests', () => {
  describe('Class tests', () => {
    it('should return the path as defined when path() called', () => (
      expect(Route.path()).toEqual('')
    ))
    it.each(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])('should respond 404 "Invalid method" when %s received', (method) => {
      expect(Route[method.toLowerCase()]).toThrow(new NotFoundError('Invalid method'))
    })
  })
  describe('routerify tests', () => {
    class Test extends Route {
      static path() {
        return '/mypath'
      }
    }
    beforeAll(() => {
      jest.clearAllMocks()
      routerify(Test)
    })
    it.each(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])('should add an endpoint for %s on path', (verb) => {
      const method = verb.toLowerCase()
      expect(mockRouter[method]).toHaveBeenCalledWith(Test.path(), Test[method])
    })
  })
})

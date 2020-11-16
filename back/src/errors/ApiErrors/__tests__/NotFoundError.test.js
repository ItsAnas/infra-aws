const NotFoundError = require('../NotFoundError')
const utils = require('../../../__tests__/mockResponse')

describe('Page not found error tests', () => {
  let response
  beforeAll(() => {
    response = utils.mockResponse()
  })
  it('should contain the stack trace', () => {
    const error = new NotFoundError()
    expect(error).toHaveProperty('stack')
  })

  it('should set response status code to 404', () => {
    const error = new NotFoundError()
    error.send(response)
    expect(response.status).toHaveBeenCalledWith(404)
  })

  it('should send the message if present', () => {
    const error = new NotFoundError('message')
    error.send(response)
    expect(response.json).toHaveBeenCalledWith('message')
  })

  it('should send a default message if none is provided', () => {
    const error = new NotFoundError()
    error.send(response)
    expect(response.json).toHaveBeenCalledWith('default message')
  })

  afterEach(() => {
    utils.clearResponseMocks(response)
  })
})

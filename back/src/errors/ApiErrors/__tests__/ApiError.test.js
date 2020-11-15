const ApiError = require('../ApiError')
const utils = require('../../../__tests__/mockResponse')

describe('Api error tests', () => {
  let response
  beforeAll(() => {
    response = utils.mockResponse()
  })
  it('should contain the stack trace', () => {
    const error = new ApiError()
    expect(error).toHaveProperty('stack')
  })

  it('should set response status code to 500', () => {
    const error = new ApiError()
    error.send(response)
    expect(response.status).toHaveBeenCalledWith(500)
  })

  it('should send the message if present', () => {
    const error = new ApiError('message')
    error.send(response)
    expect(response.json).toHaveBeenCalledWith('message')
  })

  it('should send a default message if none is provided', () => {
    const error = new ApiError()
    error.send(response)
    expect(response.json).toHaveBeenCalledWith('default message')
  })

  afterEach(() => {
    utils.clearResponseMocks(response)
  })
})

const BadRequestError = require('../BadRequestError')
const utils = require('../../../__tests__/mockResponse')

describe('Bad request error tests', () => {
  let response
  beforeAll(() => {
    response = utils.mockResponse()
  })
  it('should contain the stack trace', () => {
    const error = new BadRequestError()
    expect(error).toHaveProperty('stack')
  })

  it('should set response status code to 400', () => {
    const error = new BadRequestError()
    error.send(response)
    expect(response.status).toHaveBeenCalledWith(400)
  })

  it('should send the message if present', () => {
    const error = new BadRequestError('message')
    error.send(response)
    expect(response.json).toHaveBeenCalledWith('message')
  })

  it('should send a default message if none is provided', () => {
    const error = new BadRequestError()
    error.send(response)
    expect(response.json).toHaveBeenCalledWith('default message')
  })

  afterEach(() => {
    utils.clearResponseMocks(response)
  })
})

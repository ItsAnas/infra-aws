const handler = require('../handler')

describe('error handler tests', () => {
  let next
  let status
  let json
  beforeAll(() => {
    next = jest.fn((error) => error)
    json = jest.fn((body) => body)
    status = jest.fn(() => ({ json }))
  })

  it('should send a 500 when it is called', () => {
    const error = { message: 'error' }
    const response = {
      headersSent: false,
      status,
    }
    handler(error, null, response, next)
    expect(status).toHaveBeenCalledWith(500)
  })

  it('should send the error message when it is called', () => {
    const error = { message: 'error' }
    const response = {
      headersSent: false,
      status,
    }
    handler(error, null, response, next)
    expect(json).toHaveBeenCalledWith(error.message)
  })

  it('should bypass the default handler when response not already sent', () => {
    const error = { message: 'error' }
    const response = {
      headersSent: false,
      status,
    }
    handler(error, null, response, next)
    expect(next).toHaveBeenCalledWith(/* no argument */)
  })

  it('should call default handler if response already sent', () => {
    const error = { message: 'error' }
    const response = {
      headersSent: true,
      status,
    }
    handler(error, null, response, next)
    expect(next).toHaveBeenCalledWith(error)
  })

  afterEach(() => {
    next.mockClear()
    json.mockClear()
    status.mockClear()
  })
})

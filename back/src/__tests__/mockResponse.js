function mockResponse() {
  const response = {
    status: jest.fn(() => response),
    json: jest.fn(() => response),
    sendStatus: jest.fn((status) => response.status(status).json('default message')),
  }
  return response
}

function clearResponseMocks(response) {
  response.status.mockClear()
  response.json.mockClear()
  response.sendStatus.mockClear()
}

module.exports = {
  mockResponse,
  clearResponseMocks,
}

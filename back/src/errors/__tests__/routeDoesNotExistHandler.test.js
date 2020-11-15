const handler = require('../routeDoesNotExistHandler')
const NotFoundError = require('../ApiErrors/NotFoundError')

describe('handler when route does not exist tests', () => {
  it('should throw an error when no route match', () => {
    const call = () => handler({})
    expect(call).toThrow(NotFoundError)
  })

  it('should not do anything when route match', () => {
    const call = () => handler({ route: 'matched' })
    expect(call).not.toThrow(Error)
  })
})

const assert = require('assert')
const User = require('../src/user')

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined })
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name // ES6 naming { variable }, .message key is at end of object

    assert(message === 'Name is required.')
  })

  it('requires a user\'s name longer than 2 characters', () => {
    const user = new User({ name: 'Al' })
    const validationResult = user.validateSync()
    const { message } = validationResult.errors.name

    assert(message === 'Name must be longer than 2 characters.')
  })

  it('disallows invalid rocords from being saved', (done) => {
    const user = new User({ name: 'Al' })
    user.save()
      .catch((vResult) => {
        const { message } = vResult.errors.name

        assert(message === 'Name must be longer than 2 characters.')
        done()
      }) 
  })

})
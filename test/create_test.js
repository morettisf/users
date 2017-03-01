const assert = require('assert')
const User = require('../src/user')

describe('Creating records', () => { // Mocha function
  it('saves a user', (done) => { // Mocha function. Done is a callback available to Mocha.
    const joe = new User({ name: 'Joe' })

    joe.save()
      .then(() => {
        // has joe been saved successfully?
        assert(!joe.isNew)
        done()
      })
  })
})
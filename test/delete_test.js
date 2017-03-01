const assert = require('assert')
const User = require('../src/user')

describe('Deleting a user', () => {
  let joe

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    joe.save()
      .then(() => done()) // test this with brackets
  })

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe' })) // returns a promise, check if you can find Joe again
      .then((user) => { // retuns a promise, check if user is null
        assert(user === null)
        done()
      })
  })

  it('class method remove', (done) => {
    User.remove({ name: 'Joe' }) // remove all users with the name Joe
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class method findAndRemove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })
})
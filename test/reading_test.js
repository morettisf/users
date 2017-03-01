const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach // defining multiple variables with let

  beforeEach((done) => { // hook
    alex = new User({ name: 'Alex' })
    joe = new User({ name: 'Joe' }) // mongoose creates an ID before uploading to database
    maria = new User({ name: 'Maria' })
    zach = new User({ name: 'Zach' })
    
    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
      .then(() => done())
  })

  it ('finds all users with the name of Joe', (done) => {
    User.find({ name: 'Joe' }) // mongoose function, find all users "joe"
      .then((users) => { // users callback function from Promise
        assert(users[0]._id.toString() === joe._id.toString()) // toString() - need to pull out ID from ObjectID object to compare
        done()
      })
  })

  it('find a user with a particular id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe')
        done()
      })
  })

  it('can skip and limit the result set', (done) => {
    User.find({}) // find all users
      .sort({ name: 1 }) // sort in acending alphabetical order. -1 would be decending.
      .skip(1) // skip over 1st user
      .limit(2) // only show 2 of them
    .then((users) => {
      assert(users.length === 2)
      assert(users[0].name === 'Joe')
      assert(users[1].name === 'Maria')
      done()
    })
  })

})
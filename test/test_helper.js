const mongoose = require('mongoose') // const - can't later reassign the value

mongoose.Promise = global.Promise // references to use the ES6 implementation instead of default Mongoose promise

before((done) => { // Mocha function
  mongoose.connect('mongodb://localhost/users_test')
  mongoose.connection
    .once('open', () => { done() })
    .on('error', (error) => {
      console.warn('Warning', error)
    })
})


  beforeEach((done) => { // Mocha function
    const { users, comments, blogposts } = mongoose.connection.collections // ES6 to refer to "collections" object, assign mutiple variables
    users.drop(() => { // clear collections one at a time (Mongo can't do all at once)
      comments.drop(() => {
        blogposts.drop(() => {
          done()
        })
      })
    })
  })
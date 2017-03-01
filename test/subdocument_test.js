const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({ 
      name: 'Joe', 
      posts: [{ title: 'PostTitle'}] 
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'PostTitle')
        done()
      })
  })

  it('Can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' })) // automatically adds "return" in single line =>
      .then((user) => {
        user.posts.push({ title: 'New Post' })
        user.save() // need to save the user after each action in database. Doesn't automatically happen.
        return user.save() // needed to add "return" because of => {} multi line function
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post')
        done()
      })
  })

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        const post = user.posts[0]
        post.remove() // Mongoose automatically splices out of array
        return user.save() // have to save user after action to subdocuments
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0)
        done()
      })
  })

})
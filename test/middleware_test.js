const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')

describe('Middleware', () => {
  let joe, blogPost

  beforeEach((done) =>{
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' })
  
    joe.blogPosts.push(blogPost)

    Promise.all([joe.save(), blogPost.save()]) // ES6 combine promises. Doing this so you only use one done().
      .then(() => done())
  })

  it('users clean up dangling blogposts on delete', (done) => {
    joe.remove()
      .then(() => BlogPost.count()) // count function
      .then((count) => {
        assert(count === 0)
        done()
      })
  })
})
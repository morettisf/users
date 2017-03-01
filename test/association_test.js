const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Associations', () => {
  let joe, blogPost, comment
  
  beforeEach((done) =>{
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' })
    comment = new Comment({ content: 'Congrats on great post' })    
  
    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = joe // mogoose magic to make reference to Joe, not assign all of Joe's object to it

    Promise.all([joe.save(), blogPost.save(), comment.save()]) // ES6 combine promises. Doing this so you only use one done().
      .then(() => done())
  })

// it.only is a way to only run a single test, ignore all others
// xit is a way to ignore a test

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts') // modifier to display this value from user model
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great')
        done()
      })
  })

  it('saves a full relation graph', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: { // nested association. Comments appear within blogPosts.
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe')
        assert(user.blogPosts[0].title === 'JS is Great')
        assert(user.blogPosts[0].comments[0].content === 'Congrats on great post')
        assert(user.blogPosts[0].comments[0].user.name === 'Joe')
        done()
      })
  })

})
const mongoose = require('mongoose')
const PostSchema = require('./post_schema')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
})

UserSchema.virtual('postCount').get(function() { // tell mongoose we want to define a virtual field. Does not store in Mongo.
  return this.posts.length // did not use => because that would refer to the whole user.js file. Not just the user's function.
}) 

UserSchema.pre('remove', function(next) { // middleware to remove blog posts for user before deleting user
  const BlogPost = mongoose.model('blogPost')
  BlogPost.remove({ _id: { $in: this.blogPosts } }) // $in modifier in Mongo
    .then(() => next())
})

const User = mongoose.model('user', UserSchema)

module.exports = User
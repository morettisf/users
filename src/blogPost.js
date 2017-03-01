const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{ // this is an array of comments
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
})

const BlogPost = mongoose.model('blogPost', BlogPostSchema)

module.exports = BlogPost
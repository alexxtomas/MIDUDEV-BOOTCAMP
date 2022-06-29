const { model, Schema } = require('mongoose')

const blogSchema = new Schema({
  url: { type: String },
  title: { type: String },
  author: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: { type: Number }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = model('Blog', blogSchema)

module.exports = Blog

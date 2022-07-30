import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema({
  username: {
    type: String,
    requeried: true,
    unique: true,
    minlenght: 4
  },
  favoriteGenre: {
    type: String,
    requeried: true
  }
})

schema.plugin(uniqueValidator)

export default mongoose.model('User', schema)

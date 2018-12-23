import mongoose from './connection'

const { Schema } = mongoose

const User = mongoose.model(
  'User',
  Schema({
    name: String,
    email: String,
    password: String,
    admin: {
      type: Boolean,
      default: false,
    },
  })
)

export default User

import mongoose from './connection'

const { Schema } = mongoose

const User = mongoose.model(
  'User',
  Schema({
    name: String,
    email: String,
    password: {
      type: String,
      select: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  })
)

export default User

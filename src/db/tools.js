import mongoose from './connection'
const { Schema } = mongoose

const Tools = mongoose.model(
  'tools',
  Schema({
    tags: Array,
    link: String,
    title: String,
    description: String,
  })
)

export default Tools

import mongoose from './connection'
const { Schema } = mongoose

const Tools = mongoose.model(
  'tools',
  Schema({
    tags: Array,
    link: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  })
)

export default Tools

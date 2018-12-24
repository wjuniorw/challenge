import mongoose from './connection'
const { Schema } = mongoose

const Tools = mongoose.model(
  'tools',
  Schema({
    owner: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      text: true,
    },
    link: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      text: true,
    },
    description: {
      type: String,
      required: true,
      text: true,
    },
  })
)

export default Tools

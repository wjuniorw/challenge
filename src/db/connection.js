import mongoose from 'mongoose'

const DB_URI = process.env.DB_URI || 'mongodb://localhost/challenge'

mongoose.connect(
  DB_URI,
  { useNewUrlParser: true }
)
mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('open', () => {
  console.log('conectado ao db...')
})

export default mongoose

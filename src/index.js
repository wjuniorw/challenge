import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors('*'))

import routes from './routes'
import db from './db'

routes(app, db)

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`)
})

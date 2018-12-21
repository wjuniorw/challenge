import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

import routes from './routes'

routes(app)

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`)
})

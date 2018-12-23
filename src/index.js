import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

import routes from './routes'
import db from './db'

routes(app, db)

import typeDefs from './schema'
import resolvers from './resolvers'
const context = {
  db,
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})
server.applyMiddleware({ app })

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}/graphql`)
})

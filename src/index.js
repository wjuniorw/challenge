import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import { addUser } from './auth'

const app = express()
const PORT = process.env.PORT || 3000
const SECRET = process.env.SECRET || 'secret@Development'

app.use(express.json())
app.use(cors())
app.use(addUser)
app.set('SECRET', SECRET)

import routes from './routes'
import db from './db'

routes(app, db)

import typeDefs from './schema'
import resolvers from './resolvers'
const context = ({ req, res }) => ({
  db,
  user: req.user,
  secret: SECRET,
  token: req.headers['auth-token'],
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})
server.applyMiddleware({ app })

app.listen(PORT, () => {
  console.log(`Api REST rodando em: http://localhost:${PORT}`)
  console.log(`Api GraphQL rodando em: http://localhost:${PORT}/graphql`)
})

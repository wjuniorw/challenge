import tools from './tools'
import user from './user'

export default app => {
  user(app)
  tools(app)
}

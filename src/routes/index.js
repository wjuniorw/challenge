import tools from './tools'
import user from './user'

export default (app, db) => {
  user(app, db)
  tools(app, db)
}

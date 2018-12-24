import { authDelete, authUpdate, authCreate } from '../services/authorization'
import { logedIn } from '../auth'

export default (app, { Tools }) => {
  app
    .route('/tools')
    .get(logedIn, async (req, res, next) => {
      const { tag, q } = req.query
      if (!!tag) {
        let query = { tags: { $regex: tag, $options: 'i' } }
        const tools = await Tools.find(query)
        return res.send(tools)
      }
      if (!!q) {
        const tools = await Tools.find({ $text: { $search: q } })
        return res.send(tools)
      }

      const tools = await Tools.find({})
      return res.send(tools)
    })
    .post(logedIn, async (req, res, next) => {
      const { body, user } = req
      const resp = await authCreate(user, body, Tools)
      if (resp.ok) {
        res.send(resp.tool)
      }
      if (!resp.ok) {
        res.status(400).send(resp)
      }
    })

  app
    .route('/tools/:_id')
    .get(logedIn, async (req, res, next) => {
      const { _id } = req.params
      // get one tool by id
      const tool = await Tools.findOne({ _id })

      return res.send(tool)
    })
    .put(logedIn, async (req, res) => {
      const {
        params: { _id },
        body,
        user,
      } = req

      const oldTool = await Tools.findById(_id)
      const resp = await authUpdate(user, oldTool, body, Tools)

      if (resp.ok) {
        return res.send(resp)
      }
      if (!resp.ok) {
        return res.status(401).send(resp)
      }
    })
    .delete(logedIn, async (req, res) => {
      const {
        user,
        params: { _id },
      } = req
      const tool = await Tools.findById(_id)
      if (!tool) {
        return res.status(400).send({
          message: 'ferramenta nao existe',
        })
      }
      const resp = await authDelete(user, tool, Tools)

      if (resp.ok) {
        return res.send(resp)
      }
      if (!resp.ok) {
        return res.status(401).send(resp)
      }
    })
}

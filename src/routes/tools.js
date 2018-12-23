export default (app, { Tools }) => {
  app
    .route('/tools')
    .get(async (req, res, next) => {
      const { tag } = req.query
      // get all tools or tools by tags
      let query = !!tag ? { tags: { $regex: tag, $options: 'i' } } : {}
      const tools = await Tools.find(query)

      return res.send(tools)
    })
    .post(async (req, res, next) => {
      const { body, user } = req
      body.owner = user._id
      try {
        const newTool = new Tools(body)
        const tool = await newTool.save()

        return res.send(tool)
      } catch (e) {
        return res.send(
          {
            ok: false,
            message: `Erro! ${e.message}`,
          },
          500
        )
      }
    })

  app
    .route('/tools/:_id')
    .get(async (req, res, next) => {
      const { _id } = req.params
      // get one tool by id
      const tool = await Tools.findOne({ _id })

      return res.send(tool)
    })
    .put(async (req, res) => {
      const {
        params: { _id },
        body,
        user,
      } = req

      const oldTool = await Tools.findById(_id)

      if (oldTool.owner === user._id || user.admin) {
        try {
          const tool = await Tools.findByIdAndUpdate(_id, body, { new: true })
          return res.send({
            ok: true,
            tool,
          })
        } catch (e) {
          return res.send(
            {
              ok: false,
              message: `Erro! ${e.message}`,
            },
            500
          )
        }
      }
      if (oldTool.owner !== user._id && !user.admin) {
        return res.send(
          {
            ok: false,
            message: `Erro!, voce nao pode editar essa ferramenta, permissao negada!`,
          },
          401
        )
      }
    })
    .delete(async (req, res) => {
      const {
        user,
        params: { _id },
      } = req
      const tool = await Tools.findById(_id)
      if (oldTool.owner === user._id || user.admin) {
        try {
          await Tools.deleteOne({ _id })
          return res.send({
            ok: true,
            message: 'Success',
          })
        } catch (e) {
          return res.send(
            {
              ok: false,
              message: 'Error!',
            },
            500
          )
        }
      }
      if (tool.owner !== user._id) {
        return res.send(
          {
            ok: false,
            message: `Erro!, voce nao pode editar essa ferramenta, permissao negada!`,
          },
          401
        )
      }
    })
}

export default (app, { Tools }) => {
  app
    .route('/tools')
    .get(async (req, res, next) => {
      const { tags } = req.query
      // get all tools or tools by tags
      let query = !!tags ? { tags } : {}
      const tools = await Tools.find(query)

      return res.send(tools)
    })
    .post(async (req, res, next) => {
      const { body } = req
      try {
        // console.log('body from client...', body)
        const newTool = new Tools(body)
        const tool = await newTool.save()

        return res.send({
          ok: true,
          tool,
        })
      } catch (e) {
        console.log('Erro new Tool...', e.message)
        return res.send(
          {
            ok: false,
            message: 'Erro!',
          },
          500
        )
      }
    })
    .delete()
}

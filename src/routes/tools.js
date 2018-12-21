export default app => {
  app
    .route('/tools')
    .get((req, res, next) => {
      console.log('get all tools....')
      res.send({ ok: true, tool: { name: 'teste' } })
    })
    .post()
    .delete()
}

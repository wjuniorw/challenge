export default app => {
  app
    .route('/users')
    .get((req, res, next) => {
      console.log('get all users....')
      res.send({ ok: true, user: { name: 'user teste' } })
    })
    .post()
    .delete()
}

import { login } from '../auth'

export default (app, { User }) => {
  const SECRET = app.get('SECRET')

  app.post('/login', async (req, res, next) => {
    const resp = await login(req.body, User, SECRET)

    if (resp.ok) {
      return res.send(resp)
    }
    if (!resp.ok) {
      return res.send(resp, 400)
    }
  })

  app
    .route('/users')
    .get((req, res, next) => {
      console.log('get all users....')
      res.send({ ok: true, user: { name: 'user teste' } })
    })
    .post()
    .delete()
}

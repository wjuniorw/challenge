import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
const SECRET = process.env.SECRET || 'secret@user'

export const createToken = async ({ _id, admin = false }, secret) => {
  const token = await jwt.sign(
    {
      user: { _id, admin },
    },
    secret,
    {
      expiresIn: 5 * 60, //5 minutos
    }
  )
  return token
}

export const login = async ({ email, password }, User, secret) => {
  const user = await User.findOne({ email })
  if (!user) {
    return {
      ok: false,
      error: { path: 'email', message: 'Usuario nao encontrado!' },
    }
  }

  const valid = bcrypt.compareSync(password, user.password)

  if (!valid) {
    return {
      ok: false,
      error: { message: 'Usuario ou senha invalidos!' },
    }
  }

  const token = await createToken(user, secret)

  return {
    ok: true,
    user,
    token,
  }
}

export const addUser = (req, res, next) => {
  const token = req.headers['auth-token']
  if (token) {
    try {
      // verify token...
      const { user } = jwt.verify(token, SECRET)
      req.user = user
    } catch (e) {
      // handle on token invalid
      return res.status(401).send({ message: 'Sessao expirou!' })
    }
  }
  next()
}

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt-nodejs'
import validate from './services/validateSignup'

const SECRET = process.env.SECRET || 'secret@Development'

export const createToken = async ({ _id, admin = false }, secret) => {
  const token = await jwt.sign(
    {
      user: { _id, admin },
    },
    secret,
    {
      // expiresIn: '1h',
      expiresIn: '15 minutes',
    }
  )
  return token
}

export const signup = async (body, User) => {
  const { email, password } = body

  const user = await User.findOne({ email })
  const errors = validate(email, password, user)

  if (errors.length) {
    return {
      ok: false,
      errors,
    }
  }
  const passhash = bcrypt.hashSync(password)
  body.password = passhash

  const newUser = new User(body)
  try {
    const user = await newUser.save()
    return {
      ok: true,
      user,
    }
  } catch (e) {
    return {
      ok: false,
      message: e.message,
    }
  }
}

export const login = async ({ email, password }, User, secret) => {
  if (typeof password !== String) {
    password = JSON.stringify(password)
  }

  const user = await User.findOne({ email }).select('+password')
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
export const logedIn = (req, res, next) => {
  const token = req.headers['auth-token']
  if (!token) {
    return res
      .status(401)
      .send({ message: 'Faça login para acessar essa area! ;-)' })
  }
  if (token) {
    next()
  }
}

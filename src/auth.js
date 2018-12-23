export const addUser = (req, res, next) => {
  const token = req.headers['auth-token']
  try {
    // verify token...
  } catch (e) {
    // handle on token invalid
  }
}

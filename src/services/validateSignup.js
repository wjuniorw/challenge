const validate = (email, pass, user) => {
  // validar campos... e retornar possiveis errros
  if (typeof pass !== String) {
    pass = JSON.stringify(pass)
  }
  const errors = []
  if (!!user) {
    return [{ path: 'email', message: 'Email ja cadastrado!' }]
  }
  // validar email...
  const regra = /^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/
  const validEmail = regra.test(email)

  if (pass.length < 8) {
    errors.push({
      path: 'password',
      message: 'Senha curta!, deve ter no minimo 8 caracteres. ',
    })
  }
  if (!validEmail) {
    errors.push({ path: 'email', message: 'Email invalido! ' })
  }
  console.log('validating.....', errors)
  return errors
}
export default validate

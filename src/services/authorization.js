export const authDelete = async (user, { _id, owner }, Model) => {
  if (owner === user._id || user.admin) {
    try {
      await Model.deleteOne({ _id })
      return {
        ok: true,
        message: 'Success',
      }
    } catch (e) {
      console.log('erro from mongoose', e.message)
      return {
        ok: false,
        message: 'Error!',
      }
    }
  }
  if (!user._id) {
    return {
      ok: false,
      message: `Erro!, voce precisa fazer login!`,
    }
  }
  if (owner !== user._id) {
    return {
      ok: false,
      message: `Erro!, voce nao pode excluir essa ferramenta, permissao negada!`,
    }
  }
}

export const authUpdate = async (user, { _id, owner }, body, Model) => {
  // if (!user._id) {
  if (!user) {
    return {
      ok: false,
      message: `Erro!, voce precisa fazer login!`,
    }
  }
  if (owner === user._id || user.admin) {
    try {
      const tool = await Model.findByIdAndUpdate(_id, body, { new: true })
      return {
        ok: true,
        tool,
      }
    } catch (e) {
      return {
        ok: false,
        message: `Erro! ${e.message}`,
      }
    }
  }

  if (owner !== user._id && !user.admin) {
    return {
      ok: false,
      message: `Erro!, voce nao pode editar essa ferramenta, permissao negada!`,
    }
  }
}

export const authCreate = async (user, body, Model) => {
  if (!user) {
    return {
      ok: false,
      message: 'Faca login para adicionar uma ferramenta!',
    }
  }
  body.owner = user._id

  try {
    const newTool = new Model(body)
    const tool = await newTool.save()

    return {
      ok: true,
      tool,
    }
  } catch (e) {
    return {
      ok: false,
      message: `Erro! ${e.message}`,
    }
  }
}

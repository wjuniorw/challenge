export default {
  Query: {
    tools: async (root, args, { db: { Tools } }) => {
      const query = args.tags ? { tags: { $in: args.tags } } : {}
      return Tools.find(query)
    },
    tool: async (root, args, { db: { Tools } }) => {
      // const query = args.tags ? { tags: { $in: args.tags } } : {}
      return Tools.findOne(args)
    },
  },
  Mutation: {
    addTool: async (root, { data }, { db: { Tools } }) => {
      const tool = new Tools(data)
      try {
        const resp = tool.save()
        return resp
      } catch (e) {
        return {
          ok: false,
          message: e.message,
        }
      }
    },
    updTool: async (root, { _id, data }, { db: { Tools } }) => {
      try {
        const upd8 = await Tools.findByIdAndUpdate(_id, data, { new: true })
        return upd8
      } catch (e) {
        return {
          ok: false,
          message: e.message,
        }
      }
    },
    removeTool: async (root, { _id }, { db: { Tools } }) => {
      try {
        const resp = await Tools.findByIdAndRemove(_id)
        return {
          ok: true,
          message: 'Success!',
        }
      } catch (e) {
        return {
          ok: false,
          message: `Erro ao excluir! ${e.message}`,
        }
      }
    },
  },
}

import { mergeResolvers } from 'merge-graphql-schemas'

import tool from './tool'

const resolvers = mergeResolvers([tool])

export default resolvers

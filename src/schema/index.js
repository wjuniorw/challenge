import { gql } from 'apollo-server-express'
import { mergeTypes } from 'merge-graphql-schemas'

import tool from './tool'
// import user from './user'
// import generic from './generic'

const schema = mergeTypes([tool])

export default schema

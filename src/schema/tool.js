import { gql } from 'apollo-server-express'

export default gql`
  type Tool {
    id: ID
    title: String!
    link: String
    tags: [String]
    description: String
  }
  input tool {
    title: String
    link: String
    tags: [String]
    description: String
  }
  type response {
    ok: Boolean
    tool: Tool
    message: String
  }
  type Query {
    tool(_id: ID): Tool
    tools(tags: [String]): [Tool]
  }
  type Mutation {
    addTool(data: tool): Tool
    updTool(_id: ID, data: tool): Tool
    removeTool(_id: ID): response
  }
`

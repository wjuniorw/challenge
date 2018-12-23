# Challenge Back-end

---

## **Requisitos para rodar a aplicacao:**

- nodejs
- npm
- mongoDB

---

**Rodando aplicacao em modo Dev:**

    npm i
    npm start

Go To => <http://localhost:3000/>

---

**Rodando build da aplicacao:**

    npm run build

    npm run serve

Go To: <http://localhost:3000/>

---

# Rotas REST

**get all tools:**

#### GET `/tools`

- Response 200 (text/json)
- Array com todas ferramentas:

```
 [
     {
       "tags": [
         "nodejs",
         "mongodb",
         "mongoose",
         "nosql"
       ],
       "_id": "5c1d70ae51aab831fa58b862",
       "description": "ORM para mongoDB, mongoose um orm para usar o mongodb com nodejs",
       "link": "https://mongoosejs.com/",
       "title": "mongoose"
     },
     {
       ...
     }
 ]
```

---

**get tools by tag:**

#### GET `/tools?tag=nodejs`

- Array com todas ferramentas com a tag :
- Response 200 (text/json)

```
  [
    {
      "_id": "5c1e71677c2d5c0285f5ec6a",
      "title": "A query language for your API",
      "link": "http://graphql.github.io/",
      "tags": [
        "Graphql",
        "nodejs",
        "query"
      ],
      "description": "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.",
   },
   { title: 'tool'... }, {...}
  ]
```

---

**get one tool by id :**

#### GET `/tools/:id` EX: `/tools/5c1e71677c2d5c0285f5ec6a`

- Array com todas ferramentas com a tag :
- Response 200 (text/json) :

```
  {
      "_id": "5c1e71677c2d5c0285f5ec6a",
      "title": "A query language for your API",
      "link": "http://graphql.github.io/",
      "tags": [
        "Graphql",
        "nodejs",
        "query"
      ],
      "description": "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.",
  }
```

---

**Add tool :**

#### POST `/tools`

- ** Body Params:**
  <br/>
  `title: String`
  <br/>
  `link: String`
  <br/>
  `description: String`
  <br/>
  `tags: Array ex:[String, String]`

- Response 200 (text/json):

```json
{
  "title": "A query language for your API",
  "link": "http://graphql.github.io/",
  "tags": ["Graphql", "nodejs", "query"],
  "description": "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools."
}
```

---

**Update Tool :**

#### PUT `/tools/:id Ex:/tools/5c1e71677c2d5c0285f5ec6a`

- **Body Params:**
  <br/>
  `title: String`
  <br/>
  `link: String`
  <br/>
  `description: String`
  <br/>
  `tags: Array ex:[String, String]`

- Response 200 (text/json):

```json
{
  "_id": "5c1e71677c2d5c0285f5ec6a",
  "title": "A query language for your API",
  "link": "http://graphql.github.io/",
  "tags": ["Graphql", "nodejs", "query"],
  "description": "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools."
}
```

---

**DELETE Tool :**

#### DELETE `/tools/:id Ex:/tools/5c1e71677c2d5c0285f5ec6a`

- Response 200 (text/json):

```js
  {
    ok: true,
    message: 'Success'
  }
```

---

# GraphQL Querys e Mutations

Go To: <http://localhost:3000/graphql>

**query get all tools:**

```js
//exemplo de uso no GraphQL Playground

{
  tools {
    id title link description tags
  }
}
```

---

**query get tools by tag:**

```js
//exemplo de uso no GraphQL Playground
tools(tags: "GraphQL") {
  id title link description tags
}
tools(tags: ["GraphQL", "babel"]) {
  id title link description tags
}

//exemplo de uso no apollo-client
query byTag($tag: String){
  tools(tags: $tag) {
    id title link description tags
  }
}
//ou mais de uma tag
query byTags($tags: [String]){
  tools(tags: $tags) {
    id title link description tags
  }
}

```

---

**query get one tool:**

```js
//exemplo de uso no GraphQL Playground
{
  tool(_id: "5c1e71677c2d5c0285f5ec6a") {
    id title link description tags
  }
}
//exemplo de uso no apollo-client
gql`query getTool($id: ID){
  tool(_id: $id) {
    id title link description tags
  }
}`
```

---

**Mutation Add tool:**

```js
//exemplo de uso no GraphQL Playground
mutation {
  addTool(data: {
    title: "Teste"
    link:"http://teste"
    description:"teste....."
    tags: ["Graphql", "nodejs", "query", "teste"]
  }) {
    title link tags description
  }
}
//exemplo de uso no apollo-client
const ADD_TOOL = gql`
mutation AddNewTool(
  $title: String
  $link: String
  $dercription: String
  $tags: [String]
) {
  addTool(
    data: {
       title: $title link: $link
       description: $dercription tags: $tags
    }
  ) {
    title link tags description
  }
}`
```

---

**Mutation Update tool:**

```js
//exemplo de uso no GraphQL Playground
mutation {
  updTool(_id:"5c1e71677c2d5c0285f5ec6a" data: {
    title: "Teste"
    link:"http://teste"
    description:" teste."
    tags: ["Graphql", "nodejs", "query", "teste"]
  }) {
    title link tags description
  }
}
//exemplo de uso no apollo-client
const UPD_TOOL = gql`
mutation UpdateTool(
  $id: ID
  $title: String
  $link: String
  $dercription: String
  $tags: [String]
) {
  updTool(
    _id: $id
    data: {
       title: $title link: $link
       description: $dercription tags: $tags
    }
  ) {
    title link tags description
  }
}`
```

---

**Mutation delete tool:**

```js
//exemplo de uso no GraphQL Playground
mutation {
  removeTool(_id:"5c1e721a7c2d5c0285f5ec6b") {
    ok message
  }
}
//exemplo de uso no apollo-client
const DEL_TOOL = gql`
mutation remove($id: ID) {
  removeTool(_id: $id) {
    ok message
  }
}`
```

---

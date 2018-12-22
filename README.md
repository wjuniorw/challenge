# Challenge Back-end

---

**Rodando aplicacao em modo Dev:**

    npm i
    npm start

Go To => <http://localhost:3000/>

---

**Rodando build da aplicacao:**

    npm run build

    npm run serve

**Serve:**

    npm run serve

Go To: <http://localhost:3000/>

---

# Rotas REST

**get all tools:**

#### GET `/tool`

- Response 200 (text/json)
- Array com todas ferramentas:
- ```
  [
      {
        "tags": [
          "nodejs",
          "mongodb",
          "mongoose",
          "nosql"
        ],
        "_id": "5c1d70ae51aab831fa58b862",
        "description": "ORM para mongoDB, mongosse um orm para usar o mongodb com nodejs",
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

#### GET `/tool?tag=nodejs`

- Array com todas ferramentas com a tag :
- Response 200 (text/json)
- ```
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

```
{
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

**Update Tool :**

#### PUT `/tools/:id Ex:/tools/5c1e71677c2d5c0285f5ec6a`

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

- ```
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

**DELETE Tool :**

#### DELETE `/tools/:id Ex:/tools/5c1e71677c2d5c0285f5ec6a`

- Response 200 (text/json):

```
  {
    ok: true,
    message: 'Success'
  }
```

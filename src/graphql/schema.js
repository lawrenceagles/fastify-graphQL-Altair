const schema = `
  type Query {
    hello: String!
    user: User!
    post: Post! 
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    category: String!
  }
`;

module.exports = schema;

const schema = `
  type Query {
    add(x: Int, y: Int): Int
    user: String! 
  }
`;

module.exports = schema;

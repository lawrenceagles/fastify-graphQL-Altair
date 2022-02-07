const schema = `
type Query {
	user(id: ID!): User!
	users: [User]!
}

type Mutation {
	createUser(data: CreateUserInput!): User!
}

type User {
	id: ID!
	username: String!
	email: String!
	password: String!
	role: String!
}

input CreateUserInput {
	id: ID!
	username: String!
	email: String!
	password: String!
	role: String!
}
`;

export default schema;

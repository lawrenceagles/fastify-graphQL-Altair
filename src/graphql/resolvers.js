const user = require('../models/user');

const resolvers = {
	Query: {
		user: async (_, obj) => {
			return {
				id: 1234567,
				name: 'Lawrence Eagles',
				email: 'lawrence@gmail.com',
				age: 24
			};
		},

		post: async (_, obj) => {
			return {
				id: 1234566,
				title: 'Getting started with fastify and grapql',
				content:
					'Graphql or the graph query language is just a specification of how things should work. e.g how should queries work. The tool we would to get Graphql up and running on Fastify is mariutius.',
				category: 'node'
			};
		}
	}
};

module.exports = resolvers;

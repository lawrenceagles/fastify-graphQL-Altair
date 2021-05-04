const user = require('../models/user');

const resolvers = {
	Query: {
		posts: async (_, obj) => {
			return [
				{
					id: 1234566,
					title: 'Getting started with fastify and grapql',
					body:
						'Graphql or the graph query language is just a specification of how things should work. e.g how should queries work. The tool we would to get Graphql up and running on Fastify is mariutius.',
					category: 'node',
					published: false
				},
				{
					id: 1234578,
					title: 'Getting started with fastify and grapql',
					body:
						'Graphql or the graph query language is just a specification of how things should work. e.g how should queries work. The tool we would to get Graphql up and running on Fastify is mariutius.',
					category: 'node',
					published: true
				}
			];
		},

		post: async (_, obj) => {
			return {
				id: 1234566,
				title: 'Getting started with fastify and grapql',
				body:
					'Graphql or the graph query language is just a specification of how things should work. e.g how should queries work. The tool we would to get Graphql up and running on Fastify is mariutius.',
				category: 'node',
				published: true
			};
		}
	},

	Mutation: {
		createPost: async (_, obj) => {
			return { ...obj.data };
		}
	}
};

module.exports = resolvers;

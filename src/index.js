import fastify from 'fastify';
import jwt from 'jsonwebtoken';
import mercurius from 'mercurius';
import mercuriusAuth from 'mercurius-auth';
import AltairFastify from 'altair-fastify-plugin';

import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

const Port = process.env.PORT || 4500;

const app = fastify({ logger: true });

// register Alter
app.register(AltairFastify, {
	/**
	 * All these are the defaults.
	 */
	path: '/altair',
	baseURL: '/altair/',
	endpointURL: '/graphql'
});

// Active plugins below:
app.register(mercurius, {
	schema,
	resolvers,
	graphiql: 'playground',
	queryDepth: 7
});

// register auth policy
app.register(mercuriusAuth, {
	authContext(context) {
		return { identity: context.reply.request.headers['x-user'] };
	},
	async applyPolicy(authDirectiveAST, parent, args, context, info) {
		const token = context.auth.identity;
		try {
			const claim = jwt.verify(token, 'mysecrete');
		} catch (error) {
			throw new Error(`An error occurred. ${error}`);
		}

		return true;
	},
	authDirective: 'auth'
});

// create server
const start = async () => {
	try {
		await app.listen(Port);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();

import fastify from 'fastify';
import jwt from 'jsonwebtoken';
import mercurius from 'mercurius';
import mercuriusAuth from 'mercurius-auth';

import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

const Port = process.env.PORT || 4500;

const app = fastify({ logger: true });

// Active plugins below:
app.register(mercurius, {
	schema,
	resolvers,
	graphiql: 'playground'
});

app.register(mercuriusAuth, {
	authContext(context) {
		const token = context.reply.request.headers['x-user'];
		const claim = jwt.verify(token, 'mysecrete');
		return { identity: claim.role };
	},
	async applyPolicy(authDirectiveAST, parent, args, context, info) {
		if (!context.auth.identity) {
			throw new Error(`unauthenticated user`);
		}

		if (context.auth.identity !== 'admin') {
			throw new Error(`insufficient permission`);
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

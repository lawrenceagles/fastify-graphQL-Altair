import fastify from 'fastify';
import mercurius from 'mercurius';

import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

const Port = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-blog';

const app = fastify({ logger: true });

// Active plugins below:
app.register(mercurius, {
	schema,
	resolvers,
	graphiql: 'playground'
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

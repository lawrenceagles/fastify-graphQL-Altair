const app = require('fastify')({ logger: true });
const mercurius = require('mercurius');
const db = require('./config/index');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const Port = process.env.PORT || 4500;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-blog';

// Register plugins below:
app.register(db, { uri });
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

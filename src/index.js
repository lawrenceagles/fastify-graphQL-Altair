const fastify = require('fastify')({ logger: true });
const db = require('./config/index');

const Port = process.env.PORT || 4500;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-blog';

// Register plugins below:
fastify.register(db, { uri });

// create server
const start = async () => {
	try {
		await fastify.listen(Port);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();

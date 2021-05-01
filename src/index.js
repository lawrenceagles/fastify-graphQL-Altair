const fastify = require('fastify')({ logger: true });
const Port = process.env.PORT || 4500;
const uri = process.env.MONGODB_URI || 0000;

// Register plugins below:

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

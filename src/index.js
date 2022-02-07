import fastify from 'fastify';
import mercurius from 'mercurius';
import mercuriusAuth from 'mercurius-auth';
import db from './config/index';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

const Port = process.env.PORT || 4500;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphql-blog';

const app = fastify({ logger: true });

// Active plugins below:
app.register(db, { uri });
app.register(mercurius, {
	schema,
	resolvers,
	graphiql: 'playground'
});

app.register(mercuriusAuth, {
	// Load the permissions into the context from the request headers
	authContext(context) {
		const permissions = context.reply.request.headers['x-user'] || '';
		return { permissions };
	},
	async applyPolicy(policy, parent, args, context, info) {
		// When called on field `Message.adminMessage`
		// policy: { requires: 'admin' }
		// context.auth.permissions: ['user', 'admin'] - the permissions associated with the user (passed as headers in authContext)
		return context.auth.permissions.includes(policy.requires);
	},
	// Enable External Policy mode
	mode: 'external',
	policy: {
		// Associate policy with the 'Message' Object type
		Message: {
			// Define policy for 'Message' Object type
			__typePolicy: { requires: 'user' }
		},
		// Associate policy with the Query root type
		Query: {
			// Define policy for 'message' Query
			posts: { requires: 'user' }
		}
	}
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

const fp = require('fastify-plugin');
const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');
const models = { Post, User };

const ConnectDB = async (fastify, options) => {
	try {
		mongoose.connection.on('connected', () => {
			fastify.log.info({ actor: 'MongoDB' }, 'connected');
		});
		mongoose.connection.on('disconnected', () => {
			fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
		});
		const db = await mongoose.connect(options.uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		});

		// decorates fastify with our model
		fastify.decorate('db', { models });
	} catch (error) {
		console.error(error);
	}
};
module.exports = fp(ConnectDB);

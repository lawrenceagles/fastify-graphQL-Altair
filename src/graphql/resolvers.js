const user = require('../models/user');

const resolvers = {
	Query: {
		add: async (_, obj) => {
			console.log('obj', obj);
			const { x, y } = obj;
			return x + y;
		},

		user(_, obj) {
			console.log('ctx', obj);
			return 'Lawrence Eagles';
		}
	}
};

module.exports = resolvers;

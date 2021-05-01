const resolvers = {
	Query: {
		add: async (_, obj) => {
			const { x, y } = obj;
			return x + y;
		}
	}
};

module.exports = resolvers;

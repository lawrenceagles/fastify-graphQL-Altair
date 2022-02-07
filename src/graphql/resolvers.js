import Data from '../data';

const resolvers = {
	Query: {
		users: async (_, obj) => Data.users,

		user: async (_, obj) => {
			const { id } = obj;
			const user = Data.users.find();
			return user;
		}
	},

	Mutation: {
		createUser: async (_, { data }) => {
			const newPost = new Post(data);
			const post = await newPost.save();
			return post;
		}
	}
};

export default resolvers;

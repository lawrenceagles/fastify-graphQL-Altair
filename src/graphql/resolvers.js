import jwt from 'jsonwebtoken';
import Data from '../data';

const resolvers = {
	Query: {
		users: async (_, obj) => Data.users,

		user: async (_, { id }) => {
			let user = Data.users.find((user) => user.id == id);
			if (!user) {
				throw new Error('unkown user');
			}
			return user;
		},

		login: async (_, { username, password }) => {
			let user = Data.users.find((user) => user.username === username && user.password === password);
			if (!user) {
				throw new Error('unknown user!');
			}

			const token = jwt.sign({ username: user.username, password: user.password, role: user.role }, 'mysecrete');
			return token;
		}
	}
};

export default resolvers;

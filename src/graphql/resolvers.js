import mercurius from 'mercurius';
import jwt from 'jsonwebtoken';
import Data from '../data';

// const { ErrorWithProps } = Mercurius;

const resolvers = {
	Query: {
		users: async (_, obj) => Data.users,

		user: async (_, { id }) => {
			let user = Data.users.find((user) => user.id == id);

			if (!user) {
				throw new mercurius.ErrorWithProps('Invalid User ID', { id, code: 'NOT FOUND' }, 404);
			}

			return user;
		},

		login: async (_, { username, password }) => {
			let user = Data.users.find((user) => user.username === username && user.password === password);
			if (!user) {
				throw new mercurius.ErrorWithProps('Username or password incorrect', { id, code: 'INVLID_USER' }, 404);
			}

			const token = jwt.sign({ username: user.username, password: user.password, role: user.role }, 'mysecrete');
			return token;
		}
	}
};

export default resolvers;

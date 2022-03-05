import mercurius from 'mercurius';
import jwt from 'jsonwebtoken';
import Data from '../data';

const resolvers = {
	Query: {
		users: async (_, obj) => Data.users,

		user: async (_, { id }) => {
			let user = Data.users.find((user) => user.id === parseInt(id));

			if (!user) {
				throw new mercurius.ErrorWithProps('Invalid User ID', { id, code: 'NOT FOUND' }, 404);
			}

			return user;
		},

		login: async (_, { username, password }) => {
			let user = Data.users.find((user) => user.username === username && user.password === password);

			if (!user) {
				throw new mercurius.ErrorWithProps(
					'Incorrect username or password',
					{ username, code: 'INVALID_USER' },
					401
				);
			}

			const token = jwt.sign({ username: user.username, password: user.password, role: user.role }, 'mysecrete');
			user.token = token;

			return user;
		}
	}
};

export default resolvers;

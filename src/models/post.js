import mongoose from 'mongoose';

const post = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	published: {
		type: Boolean,
		required: true
	}
});

const Post = mongoose.model('post', post);
export default Post;

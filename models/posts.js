const mongoose = require('mongoose');
const users = require('../models/users');

const postsSchema = new mongoose.Schema({
	_user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	title: {
		type: String,
		required: [ true, 'please provide post title' ]
	},
	description: {
		type: String
	},
	postPicture: {
		url: { type: String, default: 'https://ik.imagekit.io/95aolvfy5yv/index_ZTb0auuWK.png' },
		fileId: String
	},
	views: {
		type: Number,
		default: 0
	},
	like: [ { type: mongoose.Schema.Types.ObjectId, ref: 'users' } ],
	dislike: [ { type: mongoose.Schema.Types.ObjectId, ref: 'users' } ],
	shares: {
		type: Number,
		default: 0
	},

	comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'comments' } ],
	created_at: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('posts', postsSchema);

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	_post: { type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
	_user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	comment: {
		type: String,
		posted: { type: Date, default: Date.now },
		required: true
	},
	like: {
		type: Number,
		default: 0
	},
	dislike: {
		type: Number,
		default: 0
	},
	replay: [ { type: mongoose.Schema.Types.ObjectId, ref: 'comments' } ]
});

module.exports = mongoose.model('Comment', commentSchema);

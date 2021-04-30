const mongoose = require('mongoose');

const contactS = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	subject: {
		type: String
	},
	phone: { type: String },
	message: {
		type: String
	},
	status: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('contact', contactS);

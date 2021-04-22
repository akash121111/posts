const mongoose = require('mongoose');

const contactS = new mongoose.Schema({
	name: {
		type: String
	},
	email: {
		type: String,
		required: [ true, 'please provide email' ]
	},
	subject: {
		type: String
	},
	message: {
		type: String
	}
});

module.exports = mongoose.model('contact', contactS);

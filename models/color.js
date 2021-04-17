const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
	primary: {
		type: String
	},
	secondry: {
		type: String
	}
});

module.exports = mongoose.model('color', colorSchema);

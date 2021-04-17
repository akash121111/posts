const config = {
	production: {
		SECRET: process.env.SECRET,
		DATABASE: process.env.MONGODB_URI,
		Fast2SMS_API: process.env.Fast2SMS_API
	},
	default: {
		SECRET: 'mysecretkey',
		DATABASE: 'mongodb+srv://akash:Ankit@nit1@cluster0.g1p5t.mongodb.net/posts?retryWrites=true&w=majority',
		Fast2SMS_API: 'jIqAS4pkxeGuv8N61LKsJZbi0UcYwQBy395oCmRMHgVXnaWPTlSXALm4nRPgI5UCM7acKT6eGVwvrhoY'
	}
};

exports.get = function get(env) {
	return config[env] || config.default;
};

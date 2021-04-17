const User = require('./../models/users');

let isUser = (req, res, next) => {
	//let token =
	User.findByToken(token, (err, user) => {
		if (err) throw err;
		if (!user)
			return res.json({
				error: true,
				message: 'please login first'
			});

		req.token = token;
		req.user = user;
		next();
	});
};

module.exports = { isUser };

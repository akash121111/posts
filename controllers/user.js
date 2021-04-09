const User = require('../models/users');
const express = require('express');
const jwt = require('jsonwebtoken');

exports.userRegistration = (req, res, next) => {
	router.post('/register', function(req, res) {
		User.findOne({ phone: req.body.phone }, function(err, user) {
			if (user) return res.status(200).json({ status: false, message: 'number exits' });

			const newuser = new User(req.body);

			newuser.save().then((user) => {
				var token = jwt.sign(user._id.toHexString(), confiq.SECRET);
				user
					.update({ token: token })
					.then((data) => {
						res.cookie('auth', token).json({
							isAuth: true,
							user: user,
							token: token
						});
					})
					.catch((err) => {
						res.status(404).json({
							status: false,
							message: err
						});
					});
			});
		});
	});
};

exports.userLogin = (req, res, next) => {
	var token = req.cookies.auth;
	User.findByToken(token, (err, user) => {
		if (err) return res(err);
		if (user)
			return res.status(400).json({
				error: true,
				message: 'You are already logged in'
			});
		else {
			User.findOne({ phone: req.body.phone }, function(err, user) {
				if (!user || !user.isAdmin)
					return res.json({ isAuth: false, message: ' Auth failed ,phone not found' });

				user.comparepassword(req.body.password, (err, isMatch) => {
					if (!isMatch) return res.json({ isAuth: false, message: "password doesn't match" });

					user.generateToken((err, user) => {
						if (err) return res.status(400).send(err);
						res.cookie('auth', user.token).json({
							isAuth: true,
							id: user._id,
							phone: user.phone,
							token: user.token
						});
					});
				});
			});
		}
	});
};

exports.userProfile = (req, res, next) => {};

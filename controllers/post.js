const User = require('../models/users');
const Post = require('../models/posts');
const express = require('express');
const jwt = require('jsonwebtoken');

exports.postCreate = async (req, res) => {
	let user = req.user._id;
	const post = new Post(req.body);

	await post
		.save()
		.then((data) => {
			let posts = data._id;
			User.updateOne({ _post: posts })
				.then((data1) => {
					res.status(201).json({
						status: true,
						message: 'post created '
						// data: data
					});
				})
				.catch((err) =>
					res.status(400).json({
						status: 400,
						message: ' keys not generated ',
						data: err
					})
				);
		})
		.catch((err) =>
			res.status(400).json({
				status: 400,
				message: ' keys not generated ',
				data: err
			})
		);
};

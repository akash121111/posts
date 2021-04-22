const User = require('../models/users');
const Post = require('../models/posts');
const express = require('express');
const jwt = require('jsonwebtoken');
const Contact = require('../models/contact');

exports.contactCreate = async (req, res) => {
	const con = new Contact(req.body);

	await con
		.save()
		.then((data) => {
			res.status(201).json({
				status: 201,
				message: ' message saved ',
				data: req.body
			});
		})
		.catch((err) =>
			res.status(400).json({
				status: 400,
				message: ' msg not saved ',
				data: err
			})
		);
};

exports.getContact = async (req, res) => {
	const data = await Contact.find();

	if (!data) {
		res.status(204).json({
			status: 204,
			message: ' not any messsage '
		});
	}

	res.status(200).json({
		status: 200,
		message: ' message found ',
		data: data
	});
};

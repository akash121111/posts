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

exports.getAllContact = async (req, res) => {
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

exports.getContact = async (req, res) => {
	const data = await Contact.find({ status: false }).sort({ updatedAt: 1 });

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

exports.deleteContact = async (req, res) => {
	var id = req.params.id;
	Contact.findById(id)
		.then((contact) => {
			contact
				.update({ status: true })
				.then((data) => {
					res.status(201).json({
						status: 201,
						data: data,
						message: 'updated successfully'
					});
				})
				.catch((err) => {
					res.status(400).json({
						status: 400,
						message: 'bad request',
						data: err
					});
				});
		})
		.catch((err) => {
			res.status(404).json({
				status: 404,
				message: 'not found',
				data: err
			});
		});
};

const express = require('express');
const Color = require('../models/color');

exports.updateColor = async (req, res) => {
	var id = '607addb34517b607e436c26d';
	Color.findById(id)
		.then((actorMovie) => {
			actorMovie
				.update(req.body)
				.then((data) => {
					res.status(202).json({
						status: 202,
						data: req.body,
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
	// taking a vendor
	// await Color.findByIdAndUpdate('', req.body, { new: true, runValidators: true })
	// 	.then((data) => {
	// 		res.status(202).json({
	// 			status: 202,
	// 			data: data,
	// 			message: 'colors update'
	// 		});
	// 	})
	// 	.catch((err) => {
	// 		res.status(400).json({
	// 			status: 400,
	// 			message: err
	// 		});
	// 	});
};

exports.getColor = async (req, res) => {
	// taking a vendor
	await Color.findById('607addb34517b607e436c26d')
		.then((data) => {
			res.status(202).json({
				status: 202,
				data: data,
				message: 'colors get'
			});
		})
		.catch((err) => {
			res.status(400).json({
				status: 400,
				message: err
			});
		});
};

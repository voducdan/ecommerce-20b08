const ErrorResponse = require('../utils/errorResponse');
const Invoice = require('../models/invoice.model');
const mongoose = require('mongoose');
module.exports = async (req, res, next) => {
	const query = { ...req.query };

	if (Object.entries(query).length == 0) {
		let revenueOfCategory = {};
		const invoices = await Invoice.find().populate('course');
		try {
			invoices.forEach((invoice) => {
				invoice.course.forEach((item) => {
					if (
						Object.keys(revenueOfCategory).indexOf(
							item.category.title
						) > -1
					) {
						revenueOfCategory[item.category.title] += item.price;
					} else {
						revenueOfCategory[item.category.title] = item.price;
					}
				});
			});
			return res.status(200).json({
				success: true,
				data: revenueOfCategory,
			});
		} catch (error) {
			return next(new ErrorResponse(error, 400));
		}
	}
	let revenueOfCategory = 0;
	const invoices = await Invoice.find().populate('course');
	try {
		invoices.forEach((invoice) => {
			invoice.course.forEach((item) => {
				if (query.category === item.category.slug) {
					revenueOfCategory += item.price;
				}
			});
		});
		return res.status(200).json({
			success: true,
			data: revenueOfCategory,
		});
	} catch (error) {
		return next(new ErrorResponse(error, 400));
	}
};

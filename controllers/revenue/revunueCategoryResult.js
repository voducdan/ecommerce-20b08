const ErrorResponse = require('../../utils/errorResponse');
const Invoice = require('../../models/invoice.model');
const mongoose = require('mongoose');
module.exports = async (req, res, next) => {
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
					revenueOfCategory[item.category.title] = {
						revenue:
							revenueOfCategory[item.category.title].revenue +
							item.price,
						count: revenueOfCategory[item.category.title].count + 1,
					};
				} else {
					revenueOfCategory[item.category.title] = {
						revenue: item.price,
						count: 1,
					};
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

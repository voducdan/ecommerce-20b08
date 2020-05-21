const checkDate = require('../utils/validateDate');
const ErrorResponse = require('../utils/errorResponse');
const Invoice = require('../models/invoice.model');

module.exports = async (req, res, next) => {
	const query = { ...req.query };
	if (!checkDate(query)) {
		return next(new ErrorResponse('Entered date is invalid', 400));
	}
	if (Object.entries(query).length == 0) {
		const date = {
			day: new Date().getDay(),
			month: new Date().getMonth() + 1,
			year: new Date().getFullYear(),
		};
		const revenueOfDay = await Invoice.find({});
		console.log(revenueOfDay);
	}
	res.status(200).json({
		success: true,
		data: {
			revenue: 100,
		},
	});
};

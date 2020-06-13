const checkDate = require('../../utils/validateDate');
const ErrorResponse = require('../../utils/errorResponse');
const Invoice = require('../../models/invoice.model');

module.exports = async (req, res, next) => {
	const query = { ...req.query };
	if (!checkDate(query)) {
		return next(new ErrorResponse('Entered date is invalid', 400));
	}
	if (Object.entries(query).length == 0) {
		const date = {
			day: new Date().getDate(),
			month: new Date().getMonth() + 1,
			year: new Date().getFullYear(),
		};
		const invoicesOfDay = await Invoice.find({
			day: date.day,
			month: date.month,
			year: date.year,
		});
		const invoicesOfMonth = await Invoice.find({
			year: date.year,
			month: date.month,
		});
		const invoicesOfYear = await Invoice.find({
			year: date.year,
		});
		const revenueOfDay = await Invoice.getRevenueInDay(
			date.day,
			date.month,
			date.year
		);
		const revenueOfMonth = await Invoice.getRevenueInMonth(
			date.month,
			date.year
		);
		const revenueOfYear = await Invoice.getRevenueInYear(date.year);

		return res.status(200).json({
			success: true,
			data: {
				invoicesOfDay,
				invoicesOfMonth,
				invoicesOfYear,
				revenueOfDay,
				revenueOfMonth,
				revenueOfYear,
			},
		});
	}
	if (query.day && query.month && query.year) {
		const date = {
			day: parseInt(query.day),
			month: parseInt(query.month),
			year: parseInt(query.year),
		};
		const invoicesOfDay = await Invoice.find({
			day: date.day,
			month: date.month,
			year: date.year,
		});
		const revenueOfDay = await Invoice.getRevenueInDay(
			date.day,
			date.month,
			date.year
		);
		return res.status(200).json({
			success: true,
			data: {
				invoicesOfDay,
				revenueOfDay,
			},
		});
	}
	if (query.month && query.year) {
		const date = {
			month: parseInt(query.month),
			year: parseInt(query.year),
		};
		const invoicesOfMonth = await Invoice.find({
			month: date.month,
			year: date.year,
		});
		const revenueOfMonth = await Invoice.getRevenueInMonth(
			date.month,
			date.year
		);
		return res.status(200).json({
			success: true,
			data: {
				invoicesOfMonth,
				revenueOfMonth,
			},
		});
	}
	if (query.year) {
		const date = {
			year: parseInt(query.year),
		};
		const invoicesOfYear = await Invoice.find({
			year: date.year,
		});
		const revenueOfYear = await Invoice.getRevenueInYear(date.year);
		return res.status(200).json({
			success: true,
			data: {
				invoicesOfYear,
				revenueOfYear,
			},
		});
	}

	return next(new ErrorResponse('Please provide right date', 400));
};

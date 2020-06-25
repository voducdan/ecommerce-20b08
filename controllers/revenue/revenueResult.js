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
		const invoicesOfMonth = await Invoice.find({
			year: date.year,
			month: date.month,
		})
			.select('user course total_price day month year')
			.populate('user', 'lastname firstname')
			.populate('course', 'name');

		const invoicesOfYear = await Invoice.find({
			year: date.year,
		})
			.select('user course total_price day month year')
			.populate('user', 'lastname firstname')
			.populate('course', 'name');
		const revenueOfMonth = await Invoice.getRevenueInMonth(
			date.month,
			date.year
		);
		const revenueOfYear = await Invoice.getRevenueInYear(date.year);
		const countInvoicesOfYear = await Invoice.invoicesOfYear(date.year);
		const countInvoicesOfMonth = await Invoice.invoicesOfMonth(
			date.month,
			date.year
		);
		const totalMonth = await Invoice.getTotalRevenueInMonth(
			date.month,
			date.year
		);
		const totalYear = await Invoice.getTotalRevenueInYear(date.year);
		return res.status(200).json({
			success: true,
			data: {
				invoicesOfMonth,
				invoicesOfYear,
				revenueOfMonth,
				revenueOfYear,
				totalMonth,
				totalYear,
				countInvoicesOfYear,
				countInvoicesOfMonth,
			},
		});
	}

	if (query.month) {
		const date = {
			month: parseInt(query.month),
			year: new Date().getFullYear(),
		};
		const invoicesOfMonth = await Invoice.find({
			year: date.year,
			month: date.month,
		})
			.select('user course total_price day month year')
			.populate('user', 'lastname firstname')
			.populate('course', 'name');
		const revenueOfMonth = await Invoice.getRevenueInMonth(
			date.month,
			date.year
		);
		const totalMonth = await Invoice.getTotalRevenueInMonth(
			date.month,
			date.year
		);
		const countInvoicesOfMonth = await Invoice.invoicesOfMonth(
			date.month,
			date.year
		);
		return res.status(200).json({
			success: true,
			data: {
				invoicesOfMonth,
				revenueOfMonth,
				totalMonth,
				countInvoicesOfMonth,
			},
		});
	}

	return next(new ErrorResponse('Please provide right date', 400));
};

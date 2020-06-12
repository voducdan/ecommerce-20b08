const mongoose = require('mongoose');
const Course = require('./course.model');
const category = require('./category.model');
const invoiceSchema = new mongoose.Schema({
	course: {
		type: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Course',
			},
		],
		required: [true, 'An invoice must have at least 1 course'],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'An invoice must belong to a user'],
	},
	day: {
		type: Number,
		default: new Date().getDate(),
	},
	month: {
		type: Number,
		default: new Date().getMonth() + 1,
	},
	year: {
		type: Number,
		default: new Date().getFullYear(),
	},
	create_at: {
		type: Date,
		default: Date.now,
	},
	total_price: Number,
	payment_method: String,
});

invoiceSchema.statics.getRevenueInDay = async function (day, month, year) {
	const invoicesOfDay = await this.aggregate([
		{
			$match: { day, month, year },
		},
		{
			$group: {
				_id: {
					$dateToString: { format: '%Y-%m-%d', date: '$create_at' },
				},
				revenueInDay: { $sum: '$total_price' },
			},
		},
	]);
	return invoicesOfDay;
};

invoiceSchema.statics.getRevenueInMonth = async function (month, year) {
	const invoicesOfMonth = await this.aggregate([
		{
			$match: { month, year },
		},
		{
			$group: {
				_id: '$day',
				revenueInMonth: { $sum: '$total_price' },
			},
		},
	]);
	return invoicesOfMonth;
};

invoiceSchema.statics.getRevenueInYear = async function (year) {
	const invoicesOfMonth = await this.aggregate([
		{
			$match: { year },
		},
		{
			$group: {
				_id: '$month',
				revenueInYear: { $sum: '$total_price' },
			},
		},
	]);
	return invoicesOfMonth;
};

module.exports = mongoose.model('Invoice', invoiceSchema);

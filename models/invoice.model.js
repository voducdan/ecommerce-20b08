const mongoose = require('mongoose');

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

invoiceSchema.pre('save', async function (next) {
	if (!this.day) {
		this.day = new Date().getDate();
	}
	if (!this.month) {
		this.month = new Date().getMonth() + 1;
	}
	if (!this.year) {
		this.year = new Date().getFullYear();
	}
});

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
		{ $sort: { _id: 1 } },
	]);
	let ind = 0;
	invoicesOfMonth.forEach((item, index) => {
		for (let i = item._id - 1; i > ind; i--) {
			invoicesOfMonth.splice(index, 0, { _id: i, revenueInMonth: 0 });
		}
		ind = item._id;
	});
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
		{ $sort: { _id: 1 } },
	]);
	let ind = 0;
	invoicesOfMonth.forEach((item, index) => {
		for (let i = item._id - 1; i > ind; i--) {
			invoicesOfMonth.splice(index, 0, { _id: i, revenueInYear: 0 });
		}
		ind = item._id;
	});
	return invoicesOfMonth;
};

invoiceSchema.statics.getTotalRevenueInMonth = async function (month, year) {
	const totalMonth = await this.aggregate([
		{
			$match: { month, year },
		},
		{
			$group: {
				_id: null,
				totalMonth: { $sum: '$total_price' },
			},
		},
		{ $sort: { _id: 1 } },
	]);
	return totalMonth;
};

invoiceSchema.statics.getTotalRevenueInYear = async function (year) {
	const totalYear = await this.aggregate([
		{
			$match: { year },
		},
		{
			$group: {
				_id: null,
				totalYear: { $sum: '$total_price' },
			},
		},
		{ $sort: { _id: 1 } },
	]);
	return totalYear;
};

invoiceSchema.statics.invoicesOfMonth = async function (month, year) {
	const countInvoicesOfMonth = await this.aggregate([
		{
			$match: {
				month,
				year,
			},
		},
		{
			$unwind: {
				path: '$day',
			},
		},
		{
			$group: {
				_id: '$day',
				count: { $sum: 1 },
			},
		},
		{ $sort: { _id: 1 } },
	]);
	let ind = 0;
	countInvoicesOfMonth.forEach((item, index) => {
		for (let i = item._id - 1; i > ind; i--) {
			countInvoicesOfMonth.splice(index, 0, { _id: i, count: 0 });
		}
		ind = item._id;
	});
	return countInvoicesOfMonth;
};

invoiceSchema.statics.invoicesOfYear = async function (year) {
	const countInvoicesOfYear = await this.aggregate([
		{
			$match: {
				year,
			},
		},
		{
			$unwind: {
				path: '$month',
			},
		},
		{
			$group: {
				_id: '$month',
				count: { $sum: 1 },
			},
		},
		{ $sort: { _id: 1 } },
	]);
	let ind = 0;
	countInvoicesOfYear.forEach((item, index) => {
		for (let i = item._id - 1; i > ind; i--) {
			countInvoicesOfYear.splice(index, 0, { _id: i, count: 0 });
		}
		ind = item._id;
	});
	return countInvoicesOfYear;
};

module.exports = mongoose.model('Invoice', invoiceSchema);

const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
	course: {
		type: [
			{
				type: mongoose.Schema.ObjectId,
				unique: true,
				ref: 'Course',
			},
		],
		required: [true, 'An invoice must have at least 1 course'],
	},
	user: {
		type: [
			{
				type: mongoose.Schema.ObjectId,
				unique: true,
				ref: 'User',
			},
		],
		required: [true, 'An invoice must belong to a user'],
	},
	create_at: {
		type: Date,
		default: Date.now,
	},
	total_price: Number,
	payment_method: String,
});

module.exports = mongoose.model('Invoice', invoiceSchema);

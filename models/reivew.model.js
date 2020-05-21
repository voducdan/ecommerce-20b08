const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
	content: {
		type: String,
		required: [true, 'A reivew must have a content'],
	},
	content_html: String,
	create_at: {
		type: Date,
		default: Date.now,
	},
	rating: {
		type: Number,
		required: [true, 'Please rate the course'],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	course: {
		type: mongoose.Schema.ObjectId,
		ref: 'Course',
		required: true,
	},
});

module.exports = mongoose.model('Review', reviewSchema);

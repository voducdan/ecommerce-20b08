const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'category must have a title'],
		trim: true,
		maxlength: [
			100,
			"Category's title must be less than or equal 100 characters",
		],
		minlength: [5, "Category's title must be greater than 5 characters"],
	},
	url: {
		type: String,
		required: [true, 'A category must have a url'],
	},
	parents_category: mongoose.Schema.ObjectId,
});

module.exports = mongoose.model('Category', categorySchema);

const mongoose = require('mongoose');
const slugify = require('slugify');
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
	slug: String,
	parents_category: {
		type: mongoose.Schema.ObjectId,
		ref: 'Category',
	},
});

categorySchema.pre('save', function (next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

categorySchema.pre('^find', function (next) {
	this.populate('parents_category');
	next();
});

module.exports = mongoose.model('Category', categorySchema);

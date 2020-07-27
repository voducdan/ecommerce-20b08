const mongoose = require('mongoose');
const slugify = require('slugify');
const courseSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Course must have a name'],
			trim: true,
			maxlength: [
				100,
				"Course's name must be less than or equal 100 characters",
			],
			minlength: [10, "Course's name must be greater than 10 characters"],
		},
		url: {
			type: String,
		},
		author: {
			type: mongoose.Schema.ObjectId,
			ref: 'Author',
			required: [true, 'Course must have a author'],
		},
		is_paid: Boolean,
		price: {
			type: Number,
		},
		concurrency: {
			type: String,
		},
		discount: {
			type: Number,
		},
		headline: {
			type: String,
			required: [true, 'Course must have a headline'],
			trim: true,
			maxlength: [
				200,
				"Course's headline must be less than or equal 200 characters",
			],
			minlength: [
				20,
				"Course's headline must be greater than 20 characters",
			],
		},
		num_students_enrolled: Number,
		avg_rating: Number,
		num_reviews: Number,
		num_lectures: {
			type: Number,
			min: [1, 'A course must have at least 1 lecture'],
		},
		image: {
			type: String,
			required: [true, 'A course must have an image'],
			match: [
				/.+\.(gif|jpe?g|tiff|png|webp|bmp)$/i,
				'Invalid image type',
			],
		},
		language: {
			type: String,
			required: [true, 'Enter a language'],
		},
		caption_languages: {
			type: [String],
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
		last_modified: {
			type: Date,
			default: Date.now,
		},
		level: {
			type: String,
			required: [true, 'Enter a level'],
			enum: ['Beginner', 'Intermediate', 'Expert', 'All levels'],
		},
		estimate_content_length: String,
		sections: {
			type: [
				new mongoose.Schema({
					section_length: {
						type: Number,
					},
					lecture_count: Number,
					title: String,
					items: [
						{
							id: {
								type: Number,
								required: true,
								unique: true,
							},
							can_be_previewed: Boolean,
							item_length: String,
							description: {
								type: String,
							},
							learn_url: String,
							title: {
								type: String,
								required: [true, 'Item must have a title'],
								trim: true,
								maxlength: [
									100,
									"Item's title must be less than or equal 100 characters",
								],
								minlength: [
									1,
									"Item's title must be greater than 5 characters",
								],
							},
						},
					],
				}),
			],
		},
		category: {
			type: mongoose.Schema.ObjectId,
			ref: 'Category',
			required: [true, 'Course must belong to a category'],
		},
		topic: {
			type: mongoose.Schema.ObjectId,
			ref: 'Topic',
			required: [true, 'Course must have a topic'],
		},
		requirements: {
			type: [String],
		},
		description: {
			type: String,
			required: [true, 'Please add a description'],
		},
		slug: String,
		objectives: [String],
		incentives_list: [String],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

courseSchema.pre(/^find/, function (next) {
	this.populate('author');
	this.populate({
		path: 'category',
		populate: {
			path: 'parents_category',
		},
	});
	this.populate('topic');
	next();
});

courseSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	this.url = '/course/' + this.slug;
	next();
});

module.exports = mongoose.model('Course', courseSchema);

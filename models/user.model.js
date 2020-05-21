const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: [true, 'Please enter your firstname'],
		trim: true,
		minlength: [2, 'Firstname must be greater than 2 characters '],
		maxlength: [30, 'Firstname must be less than or equal 30 characters'],
	},
	lastname: {
		type: String,
		required: [true, 'Please enter your lastname'],
		trim: true,
		minlength: [2, 'Lastname must be greater than 2 characters '],
		maxlength: [30, 'Lastname must be less than or equal 30 characters'],
	},
	headline: {
		type: String,
		trim: true,
		maxlength: [
			200,
			"User's headline must be less than or equal 200 characters",
		],
		minlength: [20, "User's headline must be greater than 20 characters"],
	},
	image: {
		type: String,
		match: [/.+\.(gif|jpe?g|tiff|png|webp|bmp)$/i, 'Invalid image type'],
	},
	email: {
		type: String,
		required: [true, 'Please add an email'],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please add a valid email',
		],
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6,
		select: false,
	},
	payment: new mongoose.Schema({
		name_on_card: {
			type: String,
			required: true,
		},
		card_number: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		security_code: {
			type: Number,
			require: true,
			max: 3,
			min: 3,
		},
		zip_code: {
			type: String,
			required: true,
		},
	}),
	enrolled_courses: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Course',
		},
	],
	website: String,
	create_at: {
		type: Date,
		default: Date.now,
	},
	last_modified: Date,
	cart: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Course',
		},
	],
});

module.exports = mongoose.model('User', userSchema);

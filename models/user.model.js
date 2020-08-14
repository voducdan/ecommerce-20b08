const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
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
		type: {
			type: String,
			required: true,
		},
	}),
	enrolled_courses: {
		type: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Course',
			},
		],
	},
	website: String,
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	create_at: {
		type: Date,
		default: Date.now,
	},
	role: {
		type: String,
		default: 'Member',
	},
	day: Number,
	month: Number,
	year: Number,
	last_modified: Date,
	cart: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Course',
		},
	],
});

userSchema.statics.getUsersInMonth = async function (month, year) {
	const usersInMonth = await this.aggregate([
		{
			$match: { month, year },
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
	usersInMonth.forEach((item, index) => {
		for (let i = item._id - 1; i > ind; i--) {
			usersInMonth.splice(index, 0, { _id: i, count: 0 });
		}
		ind = item._id;
	});
	return usersInMonth;
};
userSchema.statics.getUsersInYear = async function (year) {
	const usersInYear = await this.aggregate([
		{
			$match: { year },
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
	usersInYear.forEach((item, index) => {
		for (let i = item._id - 1; i > ind; i--) {
			usersInYear.splice(index, 0, { _id: i, count: 0 });
		}
		ind = item._id;
	});
	return usersInYear;
};
userSchema.statics.getCountUsersInMonth = async function (month, year) {
	const countUsersInMonth = await this.aggregate([
		{
			$match: { month, year },
		},
		{
			$group: {
				_id: 'null',
				count: { $sum: 1 },
			},
		},
	]);

	return countUsersInMonth;
};
userSchema.statics.getCountUsersInYear = async function (year) {
	const countUsersInYear = await this.aggregate([
		{
			$match: { year },
		},
		{
			$group: {
				_id: 'null',
				count: { $sum: 1 },
			},
		},
	]);

	return countUsersInYear;
};
userSchema.pre('save', async function (next) {
	if (!this.day) {
		this.day = new Date().getDate();
	}
	if (!this.month) {
		this.month = new Date().getMonth() + 1;
	}
	if (!this.year) {
		this.year = new Date().getFullYear();
	}
	if (!this.isModified('password')) return next();

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJWT = function () {
	return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};
userSchema.methods.checkPassword = async function (rawPassword) {
	return await bcrypt.compare(rawPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex');

	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');
	this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
	return resetToken;
};
module.exports = mongoose.model('User', userSchema);

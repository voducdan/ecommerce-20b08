const crypto = require('crypto');
const sendEmail = require('../../utils/sendEmail');
const User = require('../../models/user.model');
const ErrorResponse = require('../../utils/errorResponse');
forgotPassword = async (req, res, next) => {
	console.log(req.body);
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorResponse('There is no user with that email', 404));
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	// Create reset url
	const message = `Your reset passwork token is: \n\n ${resetToken}`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password reset token',
			message,
		});
	} catch (err) {
		console.log(err);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorResponse('Email could not be sent', 500));
	}

	return res.status(200).json({
		success: true,
	});
};
resetPassword = async (req, res, next) => {
	console.log(req.body);
	// Get hashed token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.body.resettoken)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(new ErrorResponse('Invalid token', 400));
	}

	// Set new password
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();

	sendTokenResponse(user, 200, res);
};
const sendTokenResponse = function (user, statusCode, res) {
	const token = user.getSignedJWT();

	res.status(statusCode).json({
		success: true,
		token,
	});
};
module.exports = {
	resetPassword,
	forgotPassword,
};

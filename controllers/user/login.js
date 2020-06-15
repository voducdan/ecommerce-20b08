const User = require('../../models/user.model');

const errorResponse = require('../../utils/errorResponse');

module.exports = async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(
			new ErrorResponse('Please provide an email and password', 400)
		);
	}

	try {
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			return next(
				new ErrorResponse('Email or password is incorrect', 401)
			);
		}

		const checkPassword = user.checkPassword(password);

		if (!checkPassword) {
			return next(
				new errorResponse('Email or password is incorrect'),
				401
			);
		}
		sendTokenResponse(user, 200, res);
	} catch (error) {
		return next(new errorResponse(error, 401));
	}
};

const sendTokenResponse = function (user, statusCode, res) {
	const token = user.getSignedJWT();

	res.status(statusCode).json({
		success: true,
		token,
	});
};

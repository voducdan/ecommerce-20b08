const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const errorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	const User = require('../../models/user.model');
	const ErrorHandler = require('../../utils/errorResponse');
	try {
		const { currPass, newPass } = req.body;
		const user = await User.findById(req.user._id).select('+password');

		const checkPassword = await user.checkPassword(currPass);
		if (!checkPassword) {
			return next(new errorResponse('Your password was incorrect'), 401);
		}
		const salt = await bcrypt.genSalt(10);
		hashPass = await bcrypt.hash(newPass, salt);
		const upDatedUser = await User.findByIdAndUpdate(
			req.user._id,
			{ password: hashPass },
			{ new: true }
		);
		sendTokenResponse(upDatedUser, 200, res);
	} catch (error) {
		return next(new ErrorHandler(error, 401));
	}
};

const sendTokenResponse = function (user, statusCode, res) {
	const token = user.getSignedJWT();

	res.status(statusCode).json({
		success: true,
		token,
	});
};

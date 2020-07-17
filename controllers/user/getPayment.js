const User = require('../../models/user.model');
const ErrorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	try {
		const payment = await User.findById(req.user._id, 'payment');
		return res.status(200).json({
			success: true,
			data: payment,
		});
	} catch (error) {
		return next(new ErrorResponse(error, 500));
	}
};

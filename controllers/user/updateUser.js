const User = require('../../models/user.model');
const ErrorHandler = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	const info = req.body;
	try {
		const updateUser = await User.findByIdAndUpdate(req.user._id, info, {
			new: true,
		});
		return res.status(200).json({
			success: true,
			data: updateUser,
		});
	} catch (error) {
		return next(new ErrorHandler(error, 500));
	}
};

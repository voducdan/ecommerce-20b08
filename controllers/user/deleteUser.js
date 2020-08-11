const ErrorResponse = require('../../utils/errorResponse');
const User = require('../../models/user.model');
module.exports = async (req, res, next) => {
	try {
		const deleteUser = await User.findByIdAndDelete(req.params.id);
		return res.status(200).json({
			success: true,
			data: deleteUser,
		});
	} catch (error) {
		return next(new ErrorResponse(error, 500));
	}
};

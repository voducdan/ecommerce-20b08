const User = require('../../models/user.model');
const errorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	try {
		const users = await User.find();
		return res.status(200).json({
			success: true,
			data: users,
		});
	} catch (error) {
		return next(new errorResponse(error, 400));
	}
};

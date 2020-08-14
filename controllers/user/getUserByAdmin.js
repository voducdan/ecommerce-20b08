const User = require('../../models/user.model');
const errorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	try {
		const userId = req.query.userId;
		const user = await User.find({ _id: userId }).populate(
			'enrolled_courses'
		);
		return res.status(200).json({
			success: true,
			data: user,
		});
	} catch (error) {
		return next(new errorResponse(error, 400));
	}
};

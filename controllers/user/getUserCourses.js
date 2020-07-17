const User = require('../../models/user.model');
const ErrorHandler = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	const info = req.body;
	try {
		const userCourses = await User.findById(
			req.user._id,
			'enrolled_courses',
			{
				new: true,
			}
		).populate('enrolled_courses');
		return res.status(200).json({
			success: true,
			data: userCourses,
		});
	} catch (error) {
		return next(new ErrorHandler(error, 500));
	}
};

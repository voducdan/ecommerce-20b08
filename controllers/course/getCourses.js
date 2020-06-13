const ErrorResponse = require('../../utils/errorResponse');
const Course = require('../../models/course.model');

module.exports = async (req, res, next) => {
	try {
		const courses = await Course.find({});
		res.status(200).json({
			success: true,
			data: courses,
		});
	} catch (error) {
		console.log(error);
		return next(new ErrorResponse(error, 400));
	}
};

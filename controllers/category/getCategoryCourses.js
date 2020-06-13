const ErrorResponse = require('../../utils/errorResponse');
const Course = require('../../models/course.model');
module.exports = async (req, res, next) => {
	try {
		const Courses = await Course.find({ category: req.params.categoryId });
		res.status(200).json({
			success: true,
			data: Courses,
		});
	} catch (error) {
		console.log(error);
		return next(new ErrorResponse(error, 400));
	}
};

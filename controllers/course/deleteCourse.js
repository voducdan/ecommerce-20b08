const Course = require('../../models/course.model');
const ErrorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	const { courseId } = req.params;

	try {
		const deletedCourse = await Course.findByIdAndDelete(courseId);
		return res.status(200).json({
			success: true,
			data: deletedCourse,
		});
	} catch (error) {
		return next(new ErrorResponse(error, 500));
	}
};

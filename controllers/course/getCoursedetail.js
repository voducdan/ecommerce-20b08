const Course = require('../../models/course.model');
const Reviews = require('../../models/reivew.model');
const ErrorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	const splitedParam = req.params.courseId.split('-');
	const courseId = splitedParam[splitedParam.length - 1];

	try {
		const course = await Course.find({ _id: courseId });
		const reviews = await Reviews.find({ course: courseId }).sort({
			create_at: -1,
		});
		return res.status(200).json({
			success: true,
			data: course,
			reviews,
		});
	} catch (error) {
		return next(new ErrorResponse(error, 400));
	}
};

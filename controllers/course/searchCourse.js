const ErrorResponse = require('../../utils/errorResponse');
const Course = require('../../models/course.model');

module.exports = async (req, res, next) => {
	try {
		const { s, level, is_paid, avg_rating } = req.body;
		const filter = {
			name: { $regex: s.toLowerCase(), $options: 'i' },
			level,
			is_paid,
			avg_rating: { $gte: avg_rating },
		};
		if (level == undefined) {
			delete filter['level'];
		}
		if (is_paid == undefined) {
			delete filter['is_paid'];
		}
		if (avg_rating == undefined) {
			delete filter['avg_rating'];
		}
		filterCourses = await Course.find(filter);
		res.status(200).json({
			success: true,
			data: filterCourses,
		});
	} catch (error) {
		console.log(error);
		return next(new ErrorResponse(error, 400));
	}
};

const ErrorResponse = require('../../utils/errorResponse');
const Course = require('../../models/course.model');
const InVoice = require('../../models/invoice.model');
const { Mongoose } = require('mongoose');
module.exports = async (req, res, next) => {
	try {
		const totalCourse = await Course.countDocuments();
		const totalMoney = await InVoice.aggregate([
			{
				$group: {
					_id: 'null',
					total: {
						$sum: '$total_price',
					},
				},
			},
		]);
		let selledCoursesArr = await InVoice.find({}, 'course');
		let selledCourses = [];
		selledCoursesArr.forEach((item) => {
			item.course.forEach((course) => {
				selledCourses.push(course.toString());
			});
		});
		res.status(200).json({
			success: true,
			data: {
				totalCourse: totalCourse,
				totalMoney: totalMoney[0]['total'],
				selledCourses: [...new Set(selledCourses)].length,
			},
		});
	} catch (error) {
		return next(new ErrorResponse(error, 400));
	}
};

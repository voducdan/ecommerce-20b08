const ErrorResponse = require('../../utils/errorResponse');
const Course = require('../../models/course.model');

module.exports = async (req, res, next) => {
	const currPage = parseInt(req.query.page) || 1;
	const perPage = 15;
	const skip = currPage * perPage - perPage;
	try {
		const courses = await Course.find({}).skip(skip).limit(perPage);
		const count = await Course.countDocuments();
		res.status(200).json({
			success: true,
			data: courses,
			page: currPage,
			next: currPage + 1,
			prev: currPage - 1,
			numPage: Math.ceil(count / perPage),
		});
	} catch (error) {
		console.log(error);
		return next(new ErrorResponse(error, 400));
	}
};

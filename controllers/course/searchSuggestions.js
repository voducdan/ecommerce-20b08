const ErrorResponse = require('../../utils/errorResponse');
const Course = require('../../models/course.model');
const Author = require('../../models/author.model');
const Category = require('../../models/category.model');

module.exports = async (req, res, next) => {
	try {
		const { s } = req.query;
		re = new RegExp(s, 'i');
		const coursesByName = await Course.find({
			name: { $regex: re },
		}).limit(4);
		const coursesByAuthor = await Author.find({
			name: { $regex: re },
		}).limit(4);
		const coursesByCategory = await Category.find({
			title: { $regex: re },
		}).limit(4);
		res.status(200).json({
			success: true,
			data: {
				coursesByName,
				coursesByAuthor,
				coursesByCategory,
			},
		});
	} catch (error) {
		console.log(error);
		return next(new ErrorResponse(error, 400));
	}
};

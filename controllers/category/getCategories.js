const ErrorResponse = require('../../utils/errorResponse');
const Category = require('../../models/category.model');

module.exports = async (req, res, next) => {
	try {
		const categories = await Category.find({});
		res.status(200).json({
			success: true,
			data: categories,
		});
	} catch (error) {
		console.log(error);
		return next(new ErrorResponse(error, 400));
	}
};

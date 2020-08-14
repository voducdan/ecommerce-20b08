const Course = require('../../models/course.model');
const ErrorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	try {
		const cart = req.body.cart;
		if (cart && cart.length > 0) {
			const promises = cart.map(async (item) => {
				return Course.findById(item);
			});
			const courses = await Promise.all(promises);
			let total = {};
			if (courses.length === 1) {
				let d1 = courses[0].discount ? courses[0].discount : 0;
				total.price = courses[0].price - (courses[0].price * d1) / 100;
			} else {
				total = courses.reduce((c1, c2) => {
					let d1 = c1.discount ? c1.discount : 0;
					let d2 = c2.discount ? c2.discount : 0;
					return {
						price:
							c1.price -
							(c1.price * d1) / 100 +
							c2.price -
							(c2.price * d2) / 100,
						discount: 0,
					};
				});
			}

			return res.status(200).json({
				success: true,
				data: courses,
				total: total.price,
			});
		}
		return res.status(400).json({
			success: false,
			data: [],
		});
	} catch (error) {
		return next(new ErrorResponse(error, 500));
	}
};

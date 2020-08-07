const User = require('../../models/user.model');
const ErrorResponse = require('../../utils/errorResponse');
module.exports = async (req, res, next) => {
	try {
		const cart = req.body.courseId;
		let user = await User.findById(req.user._id, 'cart');
		let userCart = user.cart;
		userCart.splice(userCart.indexOf(cart), 1);
		const updateCart = await User.findByIdAndUpdate(
			req.user._id,
			{ cart: userCart },
			{ new: true }
		).populate('cart');
		if (updateCart.cart.length === 0) {
			return res.status(200).json({
				success: true,
				data: [],
				total: 0,
			});
		}
		const total = updateCart.cart.reduce((c1, c2) => {
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
		return res.status(200).json({
			success: true,
			data: updateCart.cart,
			total: total.price,
		});
	} catch (error) {
		return next(new ErrorResponse(error, 500));
	}
};

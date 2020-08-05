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
		return res.status(200).json({
			success: true,
			data: updateCart.cart,
		});
	} catch (error) {
		return next(new ErrorResponse(error, 500));
	}
};

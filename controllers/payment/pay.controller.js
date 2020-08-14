const paypal = require('paypal-rest-sdk');
const User = require('../../models/user.model');
const Invoice = require('../../models/invoice.model');
module.exports = async (req, res) => {
	paypal.configure({
		mode: 'sandbox', //sandbox or live
		client_id:
			'AfUVPGPIYQNFAl-8TFy9v0TEw0M_IZ6emPqnom2T2UXDt5u-WKp1t69XwFzWlSTNMv155C8FVxrwzrFJ',
		client_secret:
			'EOoVfxfMX_vTY_fh-Ut9nst6q34JrOt70bXm3LgngJNiIdwngP5o2UJfMdK_6EL2QEZu13Ag2ZbIl9Qc',
	});

	const cart = await User.find({ _id: req.user._id }, 'cart').populate(
		'cart'
	);
	let items = [];
	let total = 0;
	cart[0].cart.map((item) => {
		items.push({
			name: item.name,
			sku: 'item',
			price: (item.price - (item.price * item.discount) / 100).toFixed(2),
			currency: 'USD',
			quantity: 1,
		});
		total += item.price - (item.price * item.discount) / 100;
	});
	const create_payment_json = {
		intent: 'sale',
		payer: {
			payment_method: 'paypal',
		},
		redirect_urls: {
			return_url: `https://ecommerce-20b08.herokuapp.com/cart/`,
			cancel_url: `https://ecommerce-20b08.herokuapp.com/cart/`,
		},
		transactions: [
			{
				item_list: {
					items: items,
				},
				amount: {
					currency: 'USD',
					total: total.toFixed(2),
				},
				description: `${req.user.firstname} ${req.user.lastname} cart checkout`,
			},
		],
	};
	paypal.payment.create(create_payment_json, async function (error, payment) {
		if (error) {
			res.status(200).json({
				success: false,
				error: error,
			});
		} else {
			const course = await User.find({ _id: req.user._id }, 'cart');
			const invoice = {
				course: course[0].cart,
				user: req.user._id,
				total_price: total,
				payment_method: 'Paypal',
			};
			await Invoice.create(invoice);
			await User.findByIdAndUpdate(req.user._id, { cart: [] });
			res.status(200).json({
				success: true,
				data: payment,
			});
		}
	});
};

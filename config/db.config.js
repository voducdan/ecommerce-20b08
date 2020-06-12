const mongoose = require('mongoose');
// connect database
connectDB = () => {
	require('../models/course.model');
	require('../models/invoice.model');
	require('../models/progress.model');
	require('../models/reivew.model');
	require('../models/topic.model');
	require('../models/user.model');
	require('../models/author.model');
	require('../models/category.model');
	require('../models/coupon.model');
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then((conn) =>
			console.log(`Connect mongodb succesful on ${conn.connection.host}`)
		)
		.catch((err) => console.error(err));
};
module.exports = connectDB;

const mongoose = require('mongoose');
// connect database
connectDB = () => {
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

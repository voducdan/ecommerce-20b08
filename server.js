const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db.config');
const errorHandler = require('./middleware/errorHandler');

// router module
const revenueRouter = require('./routes/revenue.routes');

const app = express();

// connect DB
connectDB();
// use middleware
app.use(cors());
app.use(
	express.json({
		limit: '10kb',
	})
);

// logging middleware on development mode
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
// use static
app.use(express.static(path.join(__dirname, 'dist/Projects')));
app.use('/', express.static(path.join(__dirname, 'dist/Projects')));

// use router
// app.use('/api/v1/revenue', revenueRouter);

// use errorhandler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
});

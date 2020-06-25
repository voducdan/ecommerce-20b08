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
const statisticsRouter = require('./routes/statistics.routes');
const coursesRouter = require('./routes/courses.routes');
const categoryRouter = require('./routes/category.routes');
const userRouter = require('./routes/user.routes');

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
app.use('/images', express.static(path.join(__dirname, 'uploads/images')));
app.use('/', express.static(path.join(__dirname, 'dist/Projects')));
app.use('/revenue', express.static(path.join(__dirname, 'dist/Projects')));
app.use('/courses', express.static(path.join(__dirname, 'dist/Projects')));
app.use(
	'/course/:courseId',
	express.static(path.join(__dirname, 'dist/Projects'))
);
app.use('/user/login', express.static(path.join(__dirname, 'dist/Projects')));
app.use(
	'/user/register',
	express.static(path.join(__dirname, 'dist/Projects'))
);
app.use('/dashboard', express.static(path.join(__dirname, 'dist/Projects')));
app.use(
	'/dashboard/revenue',
	express.static(path.join(__dirname, 'dist/Projects'))
);
app.use(
	'/dashboard/newuser',
	express.static(path.join(__dirname, 'dist/Projects'))
);
// use router
app.use('/api/v1/revenue', revenueRouter);
app.use('/api/v1/statistics', statisticsRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/user', userRouter);

// use errorhandler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
});

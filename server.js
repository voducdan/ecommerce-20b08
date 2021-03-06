const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
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
const searchRouter = require('./routes/search.routes');
const paymentRouter = require('./routes/payment');

const app = express();

// connect DB
connectDB();
// use middleware
app.use(cors());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 mins
	max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());
app.use(
	express.json({
		limit: '1024kb',
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
app.use('/courses', express.static(path.join(__dirname, 'dist/Projects')));
app.use(
	'/course/:courseId',
	express.static(path.join(__dirname, 'dist/Projects'))
);
app.use('/user', express.static(path.join(__dirname, 'dist/Projects')));
app.use('/user/login', express.static(path.join(__dirname, 'dist/Projects')));
app.use(
	'/user/register',
	express.static(path.join(__dirname, 'dist/Projects'))
);
app.use('/user/profile', express.static(path.join(__dirname, 'dist/Projects')));
app.use('/user/account', express.static(path.join(__dirname, 'dist/Projects')));
app.use('/dashboard', express.static(path.join(__dirname, 'dist/Projects')));
app.use(
	'/dashboard/revenue',
	express.static(path.join(__dirname, 'dist/Projects'))
);
app.use(
	'/dashboard/newuser',
	express.static(path.join(__dirname, 'dist/Projects'))
);
app.use(
	'/dashboard/products',
	express.static(path.join(__dirname, 'dist/Projects'))
);
app.use(
	'/dashboard/new',
	express.static(path.join(__dirname, 'dist/Projects'))
);
app.use(
	'/dashboard/users',
	express.static(path.join(__dirname, 'dist/Projects'))
);
app.use(
	'/dashboard/403',
	express.static(path.join(__dirname, 'dist/Projects'))
);

app.use('/cart', express.static(path.join(__dirname, 'dist/Projects')));
app.use('/about', express.static(path.join(__dirname, 'dist/Projects')));
app.use(
	'/search/course',
	express.static(path.join(__dirname, 'dist/Projects'))
);
// use router
app.use('/api/v1/revenue', revenueRouter);
app.use('/api/v1/statistics', statisticsRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/search', searchRouter);
app.use('/api/v1/payment', paymentRouter);

// use errorhandler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`);
});

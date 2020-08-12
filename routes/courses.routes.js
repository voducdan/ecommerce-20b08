const express = require('express');

const getCourses = require('../controllers/course/getCourses');
const getCourseDetail = require('../controllers/course/getCoursedetail');
const studentBuy = require('../controllers/course/studentbuy');
const deleteCourse = require('../controllers/course/deleteCourse');
const getCart = require('../controllers/course/getCart');
const info = require('../controllers/course/info');
const addCourseReview = require('../controllers/course/addCourseReview');
const { authorize, checkToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCourses);
router.route('/cart').post(getCart);
router
	.route('/:courseId')
	.get(getCourseDetail)
	.delete(checkToken, authorize('Admin'), deleteCourse);
router.post('/review', checkToken, addCourseReview);
router.get('/:categoryId/suggestion', studentBuy);
router.get('/info/statistics', info);
module.exports = router;

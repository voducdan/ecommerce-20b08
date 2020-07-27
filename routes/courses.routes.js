const express = require('express');

const getCourses = require('../controllers/course/getCourses');
const getCourseDetail = require('../controllers/course/getCoursedetail');
const studentBuy = require('../controllers/course/studentbuy');
const deleteCourse = require('../controllers/course/deleteCourse');
const searchSuggestions = require('../controllers/course/searchSuggestions');
const searchCourse = require('../controllers/course/searchCourse');

const { authorize, checkToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', getCourses);
router
	.route('/:courseId')
	.get(getCourseDetail)
	.delete(checkToken, authorize('Admin'), deleteCourse);
router.get('/:categoryId/suggestion', studentBuy);
module.exports = router;

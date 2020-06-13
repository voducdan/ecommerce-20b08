const express = require('express');

const getCourses = require('../controllers/course/getCourses');
const getCourseDetail = require('../controllers/course/getCoursedetail');
const studentBuy = require('../controllers/course/studentbuy');

const router = express.Router();

router.get('/', getCourses);
router.get('/:courseId', getCourseDetail);
router.get('/:categoryId/suggestion', studentBuy);
module.exports = router;

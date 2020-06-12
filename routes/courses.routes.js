const express = require('express');

const getCourses = require('../controllers/getCourses');
const getCourseDetail = require('../controllers/getCoursedetail');

const router = express.Router();

router.get('/', getCourses);
router.get('/:courseId', getCourseDetail);
module.exports = router;

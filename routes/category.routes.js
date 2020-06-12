const express = require('express');

const getCategories = require('../controllers/getCategories');
const getCategoryCourses = require('../controllers/getCategoryCourses');

const router = express.Router();

router.get('/', getCategories);
router.get('/:categoryId/courses', getCategoryCourses);
module.exports = router;

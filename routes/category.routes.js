const express = require('express');

const getCategories = require('../controllers/category/getCategories');
const getCategoryCourses = require('../controllers/category/getCategoryCourses');

const router = express.Router();

router.get('/', getCategories);
router.get('/:categoryId/courses', getCategoryCourses);
module.exports = router;

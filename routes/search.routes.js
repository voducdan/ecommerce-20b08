const express = require('express');

const searchSuggestions = require('../controllers/course/searchSuggestions');
const searchCourse = require('../controllers/course/searchCourse');
const searchByName = require('../controllers/course/searchByName');

const router = express.Router();

router.get('/suggestions', searchSuggestions);
router.post('/courses', searchCourse);
router.get('/', searchByName);

module.exports = router;

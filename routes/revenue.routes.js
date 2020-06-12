const express = require('express');

const revunueResult = require('../controllers/revenueResult');
const revunueCategoryResult = require('../controllers/revunueCategoryResult');

const router = express.Router();

router.route('/date').get(revunueResult);
router.route('/category').get(revunueCategoryResult);

module.exports = router;

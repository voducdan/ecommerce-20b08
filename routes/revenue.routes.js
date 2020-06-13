const express = require('express');

const revunueResult = require('../controllers/revenue/revenueResult');
const revunueCategoryResult = require('../controllers/revenue/revunueCategoryResult');

const router = express.Router();

router.route('/date').get(revunueResult);
router.route('/category').get(revunueCategoryResult);

module.exports = router;

const express = require('express');
const newUsers = require('../controllers/revenue/newUsers');

const router = express.Router();

router.route('/newusers').get(newUsers);
module.exports = router;

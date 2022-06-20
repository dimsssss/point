const express = require('express');
const router = express.Router();
const { validateUserId } = require('../validator/points');
const { lookUpPoint } = require('../controllers/points');

router.get('/:userId', validateUserId, lookUpPoint);

module.exports = router;

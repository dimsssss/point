const express = require('express');
const router = express.Router();
const { validatePlaceName } = require('../validator/places');
const { validateHandler } = require('../validator/handler');
const { createPlace } = require('../controllers/placeController');

router.post('/', validatePlaceName, validateHandler, createPlace);

module.exports = router;

const express = require('express');
const router = express.Router();
const { validateEventsRequestBody } = require('../validator/events');
const { reviewEvent } = require('../controllers/events');
const {v4: uuidv4} = require('uuid');


router.post('/', validateEventsRequestBody, reviewEvent);


module.exports = router;

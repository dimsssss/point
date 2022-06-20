const express = require('express');
const router = express.Router();
const { validateEventsRequestBody } = require('../validator/events');
const { reviewEvent } = require('../controllers/events');
const {v4: uuidv4} = require('uuid');


router.post('/', validateEventsRequestBody, reviewEvent);
// router.get('/', (req, res, next) => {
//     const result = {};
//     result.userId = uuidv4();
//     result.placeId = uuidv4();
//     result.attachedPhotoIds = [uuidv4()];
//     result.reviewId = uuidv4();
//     return res.status(200).send({result});
// });

module.exports = router;

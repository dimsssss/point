const { body } = require('express-validator');
const TYPE = 'REVIEW';
const ACTIONS = ['ADD', 'MOD', 'DELETE'];
const VERSION = 4;

const validateEventsRequestBody = [
    body('type').equals(TYPE),
    body('action').isIn(ACTIONS),
    body('reviewId').isUUID(VERSION),
    body('content').isString(),
    body('attachedPhotoIds').isArray(),
    body('attachedPhotoIds.*').isUUID(VERSION),
    body('userId').isUUID(VERSION),
    body('placeId').isUUID(VERSION),
];

module.exports = {
    validateEventsRequestBody
}

const { param } = require('express-validator');
const VERSION = 4;

const validateUserId = [
    param('userId').isUUID(VERSION),
];

module.exports = {
    validateUserId
}

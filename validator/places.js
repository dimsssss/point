const { body } = require('express-validator');
const validatePlaceName = [
    body('name').isString(),
    body('isBonus').isInt({min:0, max:1})
];

module.exports = {
    validatePlaceName
}

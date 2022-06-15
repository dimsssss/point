const { body } = require('express-validator');
const signUpUser = [
    body('name').isAscii()
];

module.exports = {
    signUpUser
}

const { validationResult } = require('express-validator')
const { StatusCodes } = require('http-status-codes')

const validateHandler = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        const requestError = result.array();
        return res.status(StatusCodes.BAD_REQUEST).send(requestError);
    }
    next();
}

module.exports = {
    validateHandler
}

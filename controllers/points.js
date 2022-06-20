const {validationResult} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const {getUserPoint} = require('../services/points');

const lookUpPoint = async (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        const requestError = result.array();
        return res.status(StatusCodes.BAD_REQUEST).send(requestError);
    }

    try {
        const db = req.app.get('db');
        const param = req.params;
        const result = await getUserPoint(db, param);
        return res.status(StatusCodes.OK).send(result);
    } catch (e) {
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: e});
    }
}

module.exports = {
    lookUpPoint
}

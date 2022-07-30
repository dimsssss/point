const {validationResult} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const {getUserPoint} = require('../services/points');

const lookUpPoint = async (req, res) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        const requestError = result.array();
        return res.status(StatusCodes.BAD_REQUEST).send(requestError);
    }

    try {
        const points = req.app.get('db').points
        const userId = req.params.userId
        const transaction = req.app.get('db').sequelize.transaction
        
        const result = await getUserPoint(transaction, userId, points);
        
        return res.status(StatusCodes.OK).send(result);
    } catch (e) {
        console.log(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: e});
    }
}

module.exports = {
    lookUpPoint
}

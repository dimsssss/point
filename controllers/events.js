const {StatusCodes} = require('http-status-codes');
const {addNewPointForWritingReview, modifyPointByEditingReview, deletePointForDeleteReview} = require('../services/points');
const {validationResult} = require("express-validator");

const reviewEvent = async (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if (hasErrors) {
        const requestError = result.array();
        return res.status(StatusCodes.BAD_REQUEST).send(requestError);
    }

    try {
        const {action} = req.body;
        const db = req.app.get('db');

        if (action === 'ADD') {
            const result = await addNewPointForWritingReview(db, req.body);
            return res.status(StatusCodes.CREATED).send(result);
        } else if (action === 'MOD') {
            const result = await modifyPointByEditingReview(db, req.body);
            return res.status(StatusCodes.OK).send({result});
        } else if (action === 'DELETE') {
            const result = await deletePointForDeleteReview(db, req.body);
            return res.status(StatusCodes.OK).send({result});
        }
    } catch (e) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({error: e.message});
    }
}

module.exports = {
    reviewEvent
}

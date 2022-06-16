const {StatusCodes} = require('http-status-codes')

const createPlace = async (req, res, next) => {
    const data = req.body;
    const places = req.app.get('db').places;
    const result = await places.addPlace(data);

    if (result.hasOwnProperty('errors')) {
        const errors = result.errors;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({errors});
    }

    return res.status(StatusCodes.CREATED).send(result.get({plain: true}));
}

module.exports = {
    createPlace
}

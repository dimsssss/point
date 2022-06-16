const {StatusCodes} = require('http-status-codes')

const signUp = async (req, res, next) => {
    const data = req.body;
    const users = req.app.get('db').users;
    const result = await users.signUpUser(data);

    if (result.hasOwnProperty('errors')) {
        const errors = result.errors;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({errors});
    }

    return res.status(StatusCodes.CREATED).send(result.get({plain: true}));
}

module.exports = {
    signUp
}

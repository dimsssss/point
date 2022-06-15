const express = require('express');
const router = express.Router();
const { signUpUser } = require('../validator/users');
const { validateHandler } = require('../validator/handler');
const { signUp } = require('../controllers/users');

router.post('/', signUpUser, validateHandler, signUp);

module.exports = router;

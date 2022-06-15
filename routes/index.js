const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  return res.status(200).send({ title: 'hello world' });
});

module.exports = router;

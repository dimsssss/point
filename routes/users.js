const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  return res.status(200).send('respond with a resource');
});

module.exports = router;

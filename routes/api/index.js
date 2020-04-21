const express = require('express');
const router = express.Router();

router.get('/users', function(_req, res) {
  res.send('respond with a resource');
});

module.exports = router;

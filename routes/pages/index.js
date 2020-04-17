const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/7Boss/Inventory/login');
});

// Any Route that starts with /7Boss/Inventory goes to inventory view
router.get(/\/7Boss\/Inventory(\/.*)?/, (req, res) => {
  res.render('inventory');
});

module.exports = router;

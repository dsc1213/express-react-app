const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const { app: { locals: { configs = {} } = {} } = {} } = req;
  const { routes: { routeAfterLogin } = {} } = configs;
  res.redirect(routeAfterLogin);
  // res.redirect('/7Boss/Inventory/home');
});

// Any Route that starts with /7Boss/Inventory goes to inventory view
router.get(/\/7Boss\/Inventory(\/.*)?/, (_req, res) => {
  res.render('inventory');
});

module.exports = router;

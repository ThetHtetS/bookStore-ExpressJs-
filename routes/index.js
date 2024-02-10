const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set({
    'Cross-Origin-Resource-Policy': 'cross-origin'
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;

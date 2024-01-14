const express = require('express');

const users = require('../controller/UsersController');

const router = express.Router();
/* GET users listing. */

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//router.get('/:userId', users.getUserById);
router.post('/', users.registerUser);
router.post('/login', users.login);
router.get('/', users.getAllUser);
router.get('/length', users.getTotelUser);

module.exports = router;

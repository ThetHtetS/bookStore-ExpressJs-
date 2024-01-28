const express = require('express');

const users = require('../controller/AuthController');
const user = require('../controller/UsersController');

const router = express.Router();
/* GET users listing. */

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//router.get('/:userId', users.getUserById);
router.post('/', users.signUp);
router.post('/login', users.login);
router.get('/', user.getAllUser);
// router.get('/length', users.getTotelUser);

module.exports = router;

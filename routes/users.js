const express = require('express');

const users = require('../controller/AuthController');
const user = require('../controller/UsersController');
const auth = require('../middleware/auth');

const router = express.Router();
/* GET users listing. */

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:userId/orders', user.getOrders);
router.post('/', users.signUp);
router.post('/login', users.login);
router.post('/forgetPassword', users.forgetPassword);
router.post('/resetPassword/:token', users.resetPassword);
router.patch('/updateMyPassword', auth.protect, users.updatePassword);
router.patch('/updateMe', auth.protect, user.updateMe);
router.delete('/deleteMe', auth.protect, user.deleteMe);
router.get('/', user.getAllUser);
router.get('/length', user.getTotelUser);

module.exports = router;

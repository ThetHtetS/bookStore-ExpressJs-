var express = require('express');
var router = express.Router();
var orders = require('../controller/OrderController');


router.get('/', orders.getAllOrders);
router.post('/', orders.newOrder);
router.get('/:id', orders.getOrderById);
router.get('/user/:id', orders.getOrderByUserId)
router.post('/date', orders.getOrderByCreatedDate)
router.post('/status',orders.getOrderByStatus)
router.put('/:id',orders.updateOrder);
router.delete('/:id',orders.deleteOrder);
module.exports =router;
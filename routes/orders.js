const express = require('express');
const orders = require('../controller/OrderController');

const router = express.Router();

router.get('/', orders.getAllOrders);
router.post('/', orders.newOrder);
router.get('/:id', orders.getOrderById);
router.get('/user/:id', orders.getOrderByUserId);
router.post('/date', orders.getOrderByCreatedDate);
router.post('/status', orders.getOrderByStatus);
router.put('/:id', orders.updateOrder);
router.delete('/:id', orders.deleteOrder);
module.exports = router;

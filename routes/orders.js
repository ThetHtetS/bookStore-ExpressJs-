const express = require('express');
const Order = require('../controller/OrderController');

const router = express.Router();

router.get('/', Order.getAllOrders);
router.post('/', Order.createOrder);
router.get('/:id', Order.getOrder);
router.get('/user/:id', Order.getOrderByUserId); //should be put in user controller like user/:id/orders/:id
router.post('/date', Order.getOrderByCreatedDate);
router.post('/status', Order.getOrderByStatus);
router.put('/:id', Order.updateOrder);
router.delete('/:id', Order.deleteOrder);

module.exports = router;

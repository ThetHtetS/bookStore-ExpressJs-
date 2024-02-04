const express = require('express');
const Order = require('../controller/OrderController');

const router = express.Router();

router.get('/', Order.getAllOrders);
router.get('/monthly/:year', Order.getMonthlyOrder);
router.post('/', Order.createOrder);
router.get('/:id', Order.getOrder);
//router.get('/user/:id', Order.getOrderByUserId); //should be put in user controller like user/:id/orders/:id
router.put('/:id', Order.updateOrder);
router.delete('/:id', Order.deleteOrder);

module.exports = router;

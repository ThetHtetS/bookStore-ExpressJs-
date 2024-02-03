const OrderService = require('../service/OrderService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const BookService = require('../service/BookService');

const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await OrderService.getAllOrders(req);
  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders
    }
  });
});

const getOrder = catchAsync(async (req, res, next) => {
  const orderId = req.params.id;
  const order = await OrderService.getOrderById(orderId);
  if (!order) {
    return next(new AppError('No order found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      order: [order]
    }
  });
});

const createOrder = catchAsync(async (req, res, next) => {
  const newOrder = await OrderService.save(req.body);
  if (!newOrder) return next(new AppError('cannot save order', 400));

  res.status(201).json({
    status: 'success',
    data: {
      order: newOrder
    }
  });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const order = await OrderService.updateOrder(id, req.body);
  if (!order) {
    return next(new AppError('No order found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      order: [order]
    }
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const order = await OrderService.deleteOrder(id);
  if (!order) {
    return next(new AppError('No order found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: {
      order
    }
  });
});

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
};

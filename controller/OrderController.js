const OrderService = require('../service/OrderService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await OrderService.getAllOrders();
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

const getOrderByUserId = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const order = await OrderService.getOrderByUid(userId);
  if (!order) {
    return next(new AppError('No order found with that user ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: order.length,
    data: {
      order
    }
  });
});

const getOrderByCreatedDate = catchAsync(async (req, res, next) => {
  const start = req.body.start;
  const end = req.body.end;
  const order = await OrderService.getOrderByCreatedDate(start, end);
  if (!order) {
    return next(new AppError('No Order result', 404));
  }
  res.status(200).json({
    status: 'success',
    results: order.length,
    data: {
      order
    }
  });
});

const getOrderByStatus = catchAsync(async (req, res, next) => {
  const status = req.body.status;
  const order = await OrderService.getOrderByStatus(status);
  if (!order) {
    return next(new AppError('No order result', 404));
  }
  res.status(200).json({
    status: 'success',
    results: order.length,
    data: {
      order
    }
  });
});

const createOrder = catchAsync(async (req, res, next) => {
  const newOrder = await OrderService.newOrder(req.body);
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
      order: order
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
  deleteOrder,
  getOrderByUserId,
  getOrderByCreatedDate,
  getOrderByStatus
};

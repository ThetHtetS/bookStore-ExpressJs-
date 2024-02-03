const jwt = require('jsonwebtoken');
const userService = require('./../service/UserService');
const bookService = require('../service/BookService');
const User = require('../model/User');
const categoryService = require('../service/CategoryService');
const orderService = require('../service/OrderService');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const deleteMe = async function(req, res, next) {
  await userService.deleteMe(req.user._id);

  res.status(200).json({
    status: 'success',
    message: 'Your account has been deleted successfully'
  });
};

const updateMe = async function(req, res, next) {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  // 3) Update user document
  const user = await userService.updateUserName(req.user._id, filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
};
const getUserById = async function(req, res, next) {
  const user = userService.getUserById(req.params.userId);
  res.status(200).json(user);
};

const getAllUser = async (req, res, next) => {
  const users = await userService.getAllUser();
  res.status(200).json(users);
};
const getOrders = async (req, res, next) => {
  const orders = await orderService.getOrderByUid(req.params.userId);
  if (!orders) {
    return next(new AppError('No order found with that user ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: {
      orders
    }
  });
};

const getTotelUser = async (req, res, next) => {
  const user = await userService.getTotalUser();
  const book = await bookService.getTotalBook();
  const category = await categoryService.getTotalCategory();
  const order = await orderService.getTotalOrder();
  res
    .status(200)
    .json({ user: user, book: book, category: category, order: order });
};
module.exports = {
  getUserById,
  getAllUser,
  updateMe,
  getTotelUser,
  deleteMe,
  getOrders
};

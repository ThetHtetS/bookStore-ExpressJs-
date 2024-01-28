const jwt = require('jsonwebtoken');
const userService = require('../service/UserService');
const bookService = require('../service/BookService');
const categoryService = require('../service/CategoryService');
const orderService = require('../service/OrderService');
const { config } = require('../config/Config');

const registerUser = async function(req, res, next) {
  try {
    const user = await userService.register(req.body);
    const payload = { id: user._id };
    const token = jwt.sign(payload, config.TOKEN_SECRET.user);
    res
      .status(200)
      .json({ _id: user._id, username: user.username, token: token });
  } catch (err) {
    // res.status(400).send({ message: 'User already existed' });
    next(err);
  }
};

const login = async function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await userService.login(email, password);
    if (user.role === '0') {
      const payload = { id: user._id };
      const token = jwt.sign(payload, config.TOKEN_SECRET.user);
      res
        .status(200)
        .json({ _id: user._id, username: user.username, token: token });
    } else if (user.role === '1') {
      const payload = { id: user._id };
      const token = jwt.sign(payload, config.TOKEN_SECRET.admin);
      res
        .status(200)
        .json({ _id: user._id, username: user.username, token: token });
    }
  } catch (err) {
    res.status(401).send({ message: 'Invalid user' });
  }
};
const getUserById = async function(req, res, next) {
  const user = userService.getUserById(req.params.userId);
  return res.status(200).json(user);
};

const getAllUser = async (req, res, next) => {
  const users = await userService.getAllUser();
  res.status(200).json(users);
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
  registerUser,
  login,
  getAllUser,
  getTotelUser
};

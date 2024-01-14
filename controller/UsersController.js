let userService = require('../service/UserService');
let bookService = require('../service/BookService');
let categoryService = require('../service/CategoryService');
let orderService = require('../service/OrderService');
const { config } = require('../config/Config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async function(req, res, next) {
  let name = req.body['name'];
  let email = req.body['email'];
  let password = req.body['password'];
  try {
    let user = await userService.register(name, email, password);
    console.log(user, 'user');
    let payload = { id: user._id };
    const token = jwt.sign(payload, config.TOKEN_SECRET.user);
    res
      .status(200)
      .json({ _id: user._id, username: user.username, token: token });
  } catch (err) {
    res.status(400).send({ message: 'User already existed' });
  }
};

const login = async function(req, res, next) {
  let email = req.body['email'];
  let password = req.body['password'];
  try {
    let user = await userService.login(email, password);
    if (user.role == '0') {
      let payload = { id: user._id };
      const token = jwt.sign(payload, config.TOKEN_SECRET.user);
      res
        .status(200)
        .json({ _id: user._id, username: user.username, token: token });
    } else if (user.role == '1') {
      console.log('admin token run');
      let payload = { id: user._id };
      const token = jwt.sign(payload, config.TOKEN_SECRET.admin);
      res
        .status(200)
        .json({ _id: user._id, username: user.username, token: token });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: 'Invalid user' });
  }
};
const getUserById = async function(req, res, next) {
  console.log('Req ', req.params);
  let userId = req.params.userId;
  let user = userService.getUserById(userId);
  return res.status(200).json(user);
};

const getAllUser = async (req, res, next) => {
  let users = await userService.getAllUser();
  console.log(users, 'user');
  res.status(200).json(users);
};

const getTotelUser = async (req, res, next) => {
  let user = await userService.getTotalUser();
  let book = await bookService.getTotalBook();
  let category = await categoryService.getTotalCategory();
  let order = await orderService.getTotalOrder();
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

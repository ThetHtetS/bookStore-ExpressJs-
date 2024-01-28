const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../service/UserService');
const catchAsync = require('../utils/catchAsync');
const { config } = require('../config/Config');
const AppError = require('./../utils/appError');

const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const user = await userService.register(
    name,
    email,
    password,
    passwordConfirm
  );
  const token = jwt.sign(user._id, config.TOKEN_SECRET.user);
  res
    .status(200)
    .json({ _id: user._id, username: user.username, token: token });
});

const login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // check if email or password is provided
  if (!email || !password) {
    return next(new AppError('provide email and password!', 400)); //next is optional
  }
  // get user with provided email
  const user = await userService.login(email, password);

  //check if user exists or password correct
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  //if everything ok send jwt token to the client
  if (user.role === '0') {
    const token = jwt.sign({ id: user._id }, config.TOKEN_SECRET.user);
    res.status(200).json({ _id: user._id, name: user.name, token: token });
  } else if (user.role === '1') {
    const payload = { id: user._id };
    const token = jwt.sign(payload, config.TOKEN_SECRET.admin);
    res.status(200).json({ _id: user._id, name: user.name, token: token });
  }
});

module.exports = {
  signUp,
  login
};

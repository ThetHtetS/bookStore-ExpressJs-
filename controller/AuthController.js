const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userService = require('../service/UserService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const User = require('./../model/User');

const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ _id: user._id, name: user.name, token: token });
});

const signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await userService.register(
    name,
    email,
    password,
    passwordConfirm
  );
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.status(201).json({ _id: user._id, name: user.name, token: token });
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

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ _id: user._id, name: user.name, token: token });
});

const forgetPassword = async (req, res, next) => {
  // 1)) get user based on requested email
  console.log(req.body.email);
  const user = await userService.getUserByEmail(req.body.email);

  if (!user) {
    return next(
      new AppError(`There is no user with this email: ${req.body.email}`, 404)
    );
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email

  // const resetURL = `${req.protocol}://${req.get(
  //   'host'
  // )}/api/v1/users/resetPassword/${resetToken}`;

  const resetURL = `http://localhost:3000/account/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
      html: `Click <a href="${resetURL}" > here </a> to reset  your password`
    });

    res.status(200).json({
      status: 'success',
      message: `Password reset link was sent to: ${user.email}!`
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        `There was an error sending the email. Try again later! /n ${err}`
      ),
      500
    );
  }
};

const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(200)
    .json({ status: 'success', _id: user._id, name: user.name, token: token });
});
module.exports = {
  signUp,
  login,
  forgetPassword,
  resetPassword,
  updatePassword
};

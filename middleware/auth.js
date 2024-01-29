const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const userService = require('../service/UserService');
const User = require('./../model/User');

const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);

  if (!verifiedUser) return next(new AppError('Invalid Token!', 401));

  // 3) Check if user still exists
  const currentUser = await userService.getUser(verifiedUser._id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(verifiedUser.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser; // user_id
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
module.exports = {
  protect,
  restrictTo
};

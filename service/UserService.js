const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('./../utils/appError');
const router = express.Router();
const User = require('../model/User');

const register = async (name, email, password, passwordConfirm) => {
  // console.log(name, 'name', email, 'email', password, 'password');
  //const salt = await bcrypt.genSalt(10);
  //const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    name,
    email,
    password,
    passwordConfirm
  });
  return newUser.save();
};

const login = async email => {
  const filter = { email };
  return await User.findOne(filter).select('+password'); // password is needed for verification
};

const getUser = async userId => {
  return await User.findById(userId);
};

const getAllUser = async () => {
  const users = await User.find();
  //  console.log(users);
  return users;
};

const getTotalUser = async () => {
  const length = await User.countDocuments();
  return length;
};
module.exports = {
  getUser,
  register,
  login,
  getAllUser,
  getTotalUser
};

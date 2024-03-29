const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../model/User');
const catchAsync = require('../utils/catchAsync');

const updateUserName = async (id, filteredBody) => {
  const user = await User.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true
  });
  console.log(user);
  return user;
};

const deleteMe = async function(id) {
  return await User.findByIdAndUpdate({ _id: id }, { active: false });
};
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
const getUserByEmail = async email => {
  return await User.findOne({ email });
};
const getAllUser = async () => {
  const users = await User.find();
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
  getTotalUser,
  getUserByEmail,
  updateUserName,
  deleteMe
};

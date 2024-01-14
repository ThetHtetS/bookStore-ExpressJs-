const express = require('express');
const { config } = require('../config/Config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../model/User');

const register = async (name, email, password) => {
  console.log(name, 'name', email, 'email', password, 'password');
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  let user = new User({
    username: name,
    email: email,
    password: hashPassword,
    role: '0'
  });
  console.log(user);
  return user.save();
};

const login = async (email, password) => {
  const filter = {
    email: email
  };
  const user = await User.findOne(filter);
  if (user) {
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
      return user;
    } else {
      throw Error('Invalid user or password');
    }
  }
  throw Error('Invalid user or password');
};

const getUserById = userId => {
  return {
    userId: userId,
    name: 'Some data from DB'
  };
};

const getAllUser = async () => {
  const users = await User.find();
  //  console.log(users);
  return users;
};

const getTotalUser = async () => {
  const length = await User.countDocuments();
  console.log('length', length);
  return length;
};
module.exports = {
  getUserById,
  register,
  login,
  getAllUser,
  getTotalUser
};

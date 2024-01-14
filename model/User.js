const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is necessary']
  },
  email: {
    type: String,
    required: [true, 'email is necessary'],
    trim: true,
    unique: true
  },
  password: {
    type: 'String',
    required: [true, 'password is necessary'],
    trim: true
  },
  role: {
    type: String,
    default: '0'
  }
});
module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'username is necessary']
  },
  email: {
    type: String,
    required: [true, 'email is necessary'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email Address!']
  },
  password: {
    type: String,
    required: [true, 'password is necessary'],
    trim: true,
    minlength: [8, 'password must be at least 8 characters'],
    select: false //password not sent to client
  },
  passwordConfirm: {
    type: String,
    required: [true, 'passwordConfirm is required'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

module.exports = mongoose.model('User', userSchema);

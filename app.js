const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/globalErrorHandler');
const auth = require('./middleware/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const booksRouter = require('./routes/books');
const ordersRouter = require('./routes/orders');
const reviewRouter = require('./routes/reviews');

dotenv.config({ path: './config.env' });

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/v1/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/books', booksRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/checking', auth.verifyAdminToken, (req, res, next) => {
  res.status(200).json({ message: 'success' });
});
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');
const errorHandler = require('./middleware/globalErrorHandler');
const auth = require('./middleware/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const booksRouter = require('./routes/books');
const ordersRouter = require('./routes/orders');
const reviewRouter = require('./routes/reviews');

//const auth = require('./middleware/auth');

dotenv.config({ path: './.env' });

const app = express();

// access-control
app.use('/images/books', (req, res, next) => {
  res.set({
    'Cross-Origin-Resource-Policy': 'cross-origin'
  });

  next();
});

// Set security HTTP headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
app.use(cookieParser());

// Serving static files
app.use('/images', (req, res, next) => {
  console.log('run this middleware');
  res.set({
    'Cross-Origin-Resource-Policy': 'cross-origin'
  });
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// access-control

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/books', booksRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use(
  '/api/v1/checking',
  // auth.protect,
  // auth.restrictTo('admin'),
  (req, res, next) => {
    res.status(200).json({ message: 'success' });
  }
);
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;

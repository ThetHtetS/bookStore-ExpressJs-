var createError = require('http-errors');
var express = require('express');
let auth = require('./middleware/auth');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let {db} =require('./config/database')
const mongoose = require('mongoose');
const cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var booksRouter = require('./routes/books');
var ordersRouter = require('./routes/orders');
var reviewRouter = require('./routes/reviews');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
if(process.env.NODE_ENV === 'development'){
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

mongoose.connect(db).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

    
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/books',booksRouter)
app.use('/orders', ordersRouter)
app.use('/reviews',reviewRouter)
app.use('/checking',auth.verifyAdminToken, (req,res,next)=>{
 res.status(200).json({message: "success"})
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

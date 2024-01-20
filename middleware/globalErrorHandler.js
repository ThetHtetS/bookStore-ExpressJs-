module.exports = (err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.statusCode || 500);
  res.json({ error: err.message, status: err.status });
  // render the error page
  //res.render('error');
};

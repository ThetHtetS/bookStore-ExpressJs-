module.exports = (statusCode, data, res) => {
  res.status(statusCode).json({
    status: 'success',
    results: data.length,
    books: data
  });
};

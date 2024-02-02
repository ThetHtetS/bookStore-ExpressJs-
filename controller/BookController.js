const BookService = require('../service/BookService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAllBooks = catchAsync(async (req, res) => {
  const books = await BookService.getAllBooks(req);
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books
    }
  });
});

const getBook = catchAsync(async (req, res, next) => {
  const BookId = req.params.id;
  const book = await BookService.getBookById(BookId);
  if (!book) return next(new AppError('No Book found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      book: [book]
    }
  });
});

const createBook = catchAsync(async (req, res, next) => {
  const newBook = await BookService.newBook(req.body);
  if (!newBook) return next(new AppError('cannot save book', 400));
  res.status(201).json({
    status: 'success',
    data: {
      book: newBook
    }
  });
});

const updateBook = catchAsync(async (req, res, next) => {
  const Id = req.params.id;
  const book = await BookService.updateBook(Id, req.body);
  if (!book) return next(new AppError('No Book found with that ID', 404));
  res.status(200).json({
    status: 'success',
    data: {
      book
    }
  });
});

const deleteBook = catchAsync(async (req, res, next) => {
  const Id = req.params.id;
  const book = await BookService.deleteBook(Id);
  if (!book) return next(new AppError('No Book found with that ID', 404));
  res.status(204).json({
    status: 'success',
    data: {
      book
    }
  });
});

const findBookByTitle = catchAsync(async (req, res, next) => {
  const title = req.params.title;
  const books = await BookService.searchBookByTitle(title);
  if (!books) return next(new AppError('No Book found', 404));
  res.json({
    status: 'success',
    results: books.length,
    data: {
      books
    }
  });
});

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  findBookByTitle
};

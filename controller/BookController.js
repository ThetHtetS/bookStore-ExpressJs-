const multer = require('multer');
const BookService = require('../service/BookService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/books');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadCoverPhoto = upload.single('photo');

const getAllBooks = catchAsync(async (req, res) => {
  const books = await BookService.getAllBooks(req);
  res.set({
    'Cross-Origin-Resource-Policy': 'cross-origin'
  });
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
  console.log(req.file.filename, '////////');
  const newBook = await BookService.newBook({
    ...req.body,
    photo: req.file.filename
  });
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
  res.status(201).json({
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
  findBookByTitle,
  uploadCoverPhoto
};

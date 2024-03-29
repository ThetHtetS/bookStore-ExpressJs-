const express = require('express');
const books = require('../controller/BookController');
const auth = require('../middleware/auth');
const reviewRouter = require('./../routes/reviews');

const router = express.Router();

router.use(
  '/:bookId/reviews',
  auth.protect,
  //auth.restrictTo('admin'),
  reviewRouter
);

router.get('/', books.getAllBooks);
router.get('/topFive', books.topFiveBest, books.getAllBooks);
//router.get('/', auth.protect, books.getAllBooks);
router.get('/:id', books.getBook);
router.get('/title/:title', books.findBookByTitle); //need to query
router.post(
  '/',
  auth.protect,
  auth.restrictTo('admin'),
  books.uploadCoverPhoto,
  books.createBook
);
router.put(
  '/:id',
  auth.protect,
  auth.restrictTo('admin'),
  books.uploadCoverPhoto,
  books.updateBook
);
router.delete('/:id', auth.protect, auth.restrictTo('admin'), books.deleteBook);

module.exports = router;

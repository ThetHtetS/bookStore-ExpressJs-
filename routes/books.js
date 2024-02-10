const express = require('express');
const books = require('../controller/BookController');
const auth = require('../middleware/auth');

const router = express.Router();
router.get('/', books.getAllBooks);
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
router.put('/:id', auth.protect, auth.restrictTo('admin'), books.updateBook);
router.delete('/:id', auth.protect, auth.restrictTo('admin'), books.deleteBook);

module.exports = router;

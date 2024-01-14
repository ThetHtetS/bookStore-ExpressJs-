const express = require('express');
const books = require('../controller/BookController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth.verifyUserToken, books.getAllBooks);
router.post('/', auth.verifyUserToken, books.newBook);
router.get('/:id', auth.verifyUserToken, books.getBookById);
router.get('/title/:title', auth.verifyUserToken, books.findBookByTitle);
router.put('/:id', auth.verifyAdminToken, books.updateBook);
router.delete('/:id', auth.verifyAdminToken, books.deleteBook);

module.exports = router;

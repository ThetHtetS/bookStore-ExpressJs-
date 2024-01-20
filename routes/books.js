const express = require('express');
const books = require('../controller/BookController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', books.getAllBooks);
router.post('/', auth.verifyUserToken, books.createBook);
router.get('/:id', books.getBook);
router.get('/title/:title', books.findBookByTitle); //need to query
router.put('/:id', auth.verifyAdminToken, books.updateBook);
router.delete('/:id', auth.verifyAdminToken, books.deleteBook);

module.exports = router;

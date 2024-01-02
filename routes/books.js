var express = require('express');
var router = express.Router();
var books = require('../controller/BookController');
let auth = require('../middleware/auth');

router.get('/',auth.verifyUserToken, books.getAllBooks);
router.post('/',auth.verifyUserToken, books.newBook);
router.get('/:id',auth.verifyUserToken, books.getBookById);
router.get('/title/:title',auth.verifyUserToken ,books.findBookByTitle);
router.put('/:id',auth.verifyAdminToken , books.updateBook);
router.delete('/:id',auth.verifyAdminToken ,books.deleteBook);
module.exports =router;
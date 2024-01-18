const BookService = require('../service/BookService');

async function getAllBooks(req, res, next) {
  const Books = await BookService.getAllBooks();
  return res.json(Books);
}

const newBook = async function(req, res, next) {
  try {
    const book = await BookService.newBook(req.body);
    if (!book) throw Error('Cannot save book');
    await res.status(201).json(book);
  } catch (err) {
    await res.status(400).json({ message: err.message });
  }
};

const getBookById = async function(req, res, next) {
  const BookId = req.params.id;
  try {
    const book = await BookService.getBookById(BookId);
    if (!book) {
      res.status(400).json({
        error: 'Book not found'
      });
    } else {
      res.json([book]);
    }
  } catch (e) {
    res.status(400).json({
      error: 'Book not found'
    });
  }
};
const findBookByTitle = async function(req, res, next) {
  const title = req.params.title;

  try {
    const books = await BookService.searchBookByTitle(title);
    if (!books) throw Error('No Result found');
    res.json(books);
  } catch (err) {
    await res.status(404).json({ message: err });
  }
};

async function updateBook(req, res, next) {
  try {
    const Id = req.params.id;

    const book = await BookService.updateBook(Id, req.body);
    if (!book) throw Error('Cannot update book');
    await res.status(200).json(book);
  } catch (err) {
    await res.status(400).json({ message: err });
  }
}

async function deleteBook(req, res, next) {
  try {
    const Id = req.params.id;

    const book = await BookService.deleteBook(Id);
    if (!book) throw Error('Cannot delete book');
    await res.status(200).json(book);
  } catch (err) {
    await res.status(400).json({ message: err });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  newBook,
  updateBook,
  deleteBook,
  findBookByTitle
};

//const Book = require('../model/Book');
const Books = require('../model/Books');
const APIFeatures = require('../utils/apiFeatures');

const getAllBooks = async req => {
  const features = new APIFeatures(Books.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return await features.query;
};

const searchBookByTitle = async bookTitle => {
  const books = await Books.find({
    title: {
      $regex: bookTitle,
      $options: 'i'
    }
  });
  return books;
};

const newBook = async Book => {
  const newBook = new Books(Book);
  const book = await newBook.save();
  return book.populate('category');
};

const getBookById = async BookId => {
  return Books.findById(BookId);
};

async function updateBook(bookId, book) {
  const updatedBook = await Books.findByIdAndUpdate(bookId, book, {
    new: true
  });
  return updatedBook;
}

async function deleteBook(BookId) {
  const deletedBook = await Books.findByIdAndDelete(BookId);
  return deletedBook;
}
const getTotalBook = async () => {
  const length = await Books.countDocuments();
  return length;
};
module.exports = {
  getAllBooks,
  newBook,
  getBookById,
  updateBook,
  deleteBook,
  searchBookByTitle,
  getTotalBook
};

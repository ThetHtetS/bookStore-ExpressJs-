//const Book = require('../model/Book');
const Books = require('../model/Books');
const APIFeatures = require('../utils/apiFeatures');

const getAllBooks = async req => {
  console.log(req.query);
  const features = new APIFeatures(Books.find().populate('category'), req.query)
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
  console.log(books);
  return books;
};
const getBookbyCategoryId = async CategoryId => {
  return Books.find({ movie: CategoryId }).populate('category');
};

const newBook = async Book => {
  const newBook = new Books(Book);
  let book = await newBook.save(Book);
  console.log(book);
  return book.populate('category');
};

const getBookById = async BookId => {
  return Books.findById(BookId).populate('category');
};

async function updateBook(bookId, book) {
  let updateBook = await Books.findByIdAndUpdate(bookId, book, { new: true });
  return updateBook;
}

async function deleteBook(BookId) {
  let deletedBook = await Books.findByIdAndDelete(BookId);
  return deletedBook;
}
const getTotalBook = async () => {
  const length = await Books.countDocuments();
  console.log('length', length);
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

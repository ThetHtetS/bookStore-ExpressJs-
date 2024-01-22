//const Book = require('../model/Book');

let Books = require('../model/Books');

const getAllBooks = async () => {
  return Books.find().populate('category');
};
const searchBookByTitle = async bookTitle => {
  console.log(bookTitle);
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

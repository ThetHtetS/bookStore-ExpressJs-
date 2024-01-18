//const Book = require('../model/Book');
const Books = require('../model/Books');

const getAllBooks = async () => {
  return Books.find().populate('category');
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

const getBookbyCategoryId = async CategoryId => {
  return Books.find({ movie: CategoryId }).populate('category');
};

const newBook = async Book => {
  // const newBook = new Books(Book);
  // let book = await newBook.save();
  const book = await Books.create(Book);
  return book.populate('category');
};

const getBookById = async BookId => {
  return Books.findById(BookId).populate('category');
};

async function updateBook(bookId, book) {
  const updatedBook = await Books.findByIdAndUpdate(bookId, book, {
    new: true,
    runValidators: true
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

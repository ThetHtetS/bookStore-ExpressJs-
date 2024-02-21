const mongoose = require('mongoose');
const Reviews = require('../model/Review');

// const getAllReview = async ()=>{
//     return Reviews.find();
// }
// const getReviewById = async(reviewId)=>{
//     return Reviews.findById(reviewId).populate("movi");
// }

const getReviewByBookId = async bookId => {
  return Reviews.find({ book: bookId })
    .select('-__v -book')
    .populate({
      path: 'uid',
      select: '-__v -role -email'
    });
};

const saveReview = async review => {
  const newReview = new Reviews(review);
  await newReview.save();
  return newReview.populate('uid');
};

const updateReview = async (reviewId, review) => {
  const updatedReview = await Reviews.findByIdAndUpdate(reviewId, review, {
    new: true
  });
  if (updatedReview) {
    await Reviews.calcAverageRatings(updatedReview.book);
  }
  // console.log(Reviews.r, '/////review r');
  return updatedReview.populate('uid');
};

const deleteReview = async reviewId => {
  const deletedReview = await Reviews.findByIdAndDelete(reviewId);
  return deletedReview;
};
module.exports = {
  // getAllReview,
  // getReviewById,
  saveReview,
  getReviewByBookId,
  updateReview,
  deleteReview
};

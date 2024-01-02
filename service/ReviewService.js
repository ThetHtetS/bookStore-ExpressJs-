const mongoose = require('mongoose');
let Reviews = require('../model/Review');
// let Movies = require('../model/Movie');

// const getAllReview = async ()=>{
//     return Reviews.find();
// }
// const getReviewById = async(reviewId)=>{
//     return Reviews.findById(reviewId).populate("movi");
// }
const getReviewByBookId = async(bookId)=>{
    return Reviews.find({book:bookId}).populate("uid");
}

const saveReview = async(review)=>{
    console.log(review)
    const newReview = new Reviews(review
        // uid: mongoose.Types.ObjectId(review.uid),
        // book: mongoose.Types.ObjectId(review.book),
        // rating: review.rating,
        // review: review.review,

    );
  console.log(newReview)
    await newReview.save();
    //return newReview;
    return newReview.populate('uid');
}

// const updateReview = async(reviewId,review)=>{
//     review.movie = mongoose.Types.ObjectId(review.movie);
//     //console.log('Review Id ',reviewId, ' Review ',review);
//     const updatedReview = await Reviews.findByIdAndUpdate(reviewId, review,{new: true});
//     return updatedReview.populate("movie");
// }
const deleteReview= async(reviewId)=>{
    const deletedReview = await Reviews.findByIdAndDelete(reviewId);
    return deletedReview;
}
module.exports = {
   // getAllReview,
   // getReviewById,
    saveReview,
    getReviewByBookId,
   // updateReview,
    deleteReview,

}
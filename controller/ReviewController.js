const reviewService = require('./../service/ReviewService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getReviewByBookId = catchAsync(async (req, res, next) => {
  const review = await reviewService.getReviewByBookId(req.params.bookId);
  if (!review) return next(new AppError('No review found', 404));
  res.status(200).json({
    status: 'success',
    results: review.length,
    data: {
      review
    }
  });
});

const createReview = catchAsync(async (req, res) => {
  const newReview = await reviewService.saveReview(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const review = await reviewService.deleteReview(req.params.reviewId);
  if (!review) return next(new AppError('No review found with that id', 404));
  res.status(204).json({
    status: 'success',
    data: {
      review
    }
  });
});

module.exports = {
  getReviewByBookId,
  createReview,
  deleteReview
};

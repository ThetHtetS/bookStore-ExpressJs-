const reviewService = require('./../service/ReviewService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getReviews = catchAsync(async (req, res, next) => {
  const review = await reviewService.getReviewByBookId(req.params.bookId);
  if (!review) return next(new AppError('No review found', 404));
  res.status(200).json({
    status: 'success',
    results: review.length,
    review
  });
});

const createReview = catchAsync(async (req, res) => {
  if (!req.body.book) req.body.book = req.params.bookId;
  if (!req.body.uid) req.body.uid = req.user.id;

  const newReview = await reviewService.saveReview(req.body);
  res.status(201).json({
    status: 'success',
    review: newReview
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const id = req.params.reviewId;
  const review = req.body;
  const updatedReview = await reviewService.updateReview(id, review);
  if (!updatedReview)
    return next(new AppError('No review found with that id', 404));
  res.status(200).json({
    status: 'success',
    review: updatedReview
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const review = await reviewService.deleteReview(req.params.reviewId);

  if (!review) return next(new AppError('No review found with that id', 404));
  res.status(200).json({
    status: 'success',
    review
  });
});

module.exports = {
  getReviews,
  createReview,
  updateReview,
  deleteReview
};

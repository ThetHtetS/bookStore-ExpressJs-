const express = require('express');
const review = require('./../controller/ReviewController');

const router = express.Router();

//router.get('/', review.getAllReview);
router.get('/movie/:bookId', review.getReviewByBookId);
//router.get('/:reviewId', review.getReviewById);
router.post('/', review.saveReview);
//router.put('/:reviewId',review.updateReview);
router.delete('/:reviewId', review.deleteReview);

module.exports = router;

const express = require('express');
const review = require('./../controller/ReviewController');

const router = express.Router();

router.get('/book/:bookId', review.getReviewByBookId);
router.post('/', review.createReview);
router.delete('/:reviewId', review.deleteReview);

module.exports = router;

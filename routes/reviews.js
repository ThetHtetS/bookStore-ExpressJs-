const express = require('express');
const review = require('./../controller/ReviewController');
const auth = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.get('/', review.getReviews);
router.post('/', review.createReview);
router.delete('/:reviewId', review.deleteReview);

module.exports = router;

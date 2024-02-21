const mongoose = require('mongoose');
const Book = require('./Books');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  book: {
    type: Schema.Types.ObjectId,
    ref: 'Books'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    required: true
  }
});

ReviewSchema.statics.calcAverageRatings = async function(bookId) {
  let stats = await this.aggregate([
    { $match: { book: bookId } },
    {
      $group: {
        _id: '$book',
        rQuantity: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  await Book.findByIdAndUpdate(
    bookId,
    {
      ratingsAverage: stats[0].avgRating,
      ratingsQuantity: stats[0].rQuantity
    },
    { runValidators: false }
  );
};

ReviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.book);
});

// ReviewSchema.pre(/^findOneAnd/, async function(next) {
//   //this.r = await this.findOne().clone();
//   const r = await this.findOne().clone();
//   console.log(r);
//   next();
// });

// ReviewSchema.post(/^findOneAnd/, async function() {
//   console.log('/////post middleware');
//   //await this.findOne(); //does NOT work here, query has already executed
//   await this.r.constructor.calcAverageRatings(this.r.book);
// });

module.exports = mongoose.model('Reviews', ReviewSchema);

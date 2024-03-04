const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;
const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'book must have title'],
      unique: true
    },
    slug: String,
    author: {
      type: String,
      required: [true, 'author field  is necessary']
    },
    description: {
      type: String
    },
    releaseYear: {
      type: String
    },
    releaseTimes: { type: String },
    ratingsAverage: { type: Number },
    ratingsQuantity: { type: Number },
    buyingPrice: { type: Number, required: true },
    price: {
      type: Number,
      required: [true, 'price is necessary']
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function(el) {
          return el < this.price;
        },
        message: 'Discount price must lower than original price!'
      }
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Categories'
    },
    stock: {
      type: Number,
      required: [true, 'qty is necessary']
    },
    photo: { type: String }
  },
  { timestamps: true }
);

BookSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

BookSchema.pre(/^findOne/, function(next) {
  this.populate({ path: 'category', select: '-__v' });
  next();
});

module.exports = mongoose.model('Books', BookSchema);

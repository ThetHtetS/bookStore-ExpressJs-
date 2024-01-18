const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;
const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'book must have title'],
      minLength: [6, 'Must be at least 6 charaters'],
      maxLength: [40, 'Must be have less or equal 40 characters ']
      // validate: [validator.isAlpha, 'book name must only contain characters']
    },
    price: {
      type: String,
      required: [true, 'price is necessary']
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Categories'
    },
    qty: {
      type: Number,
      required: [true, 'qty is necessary']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Books', BookSchema);

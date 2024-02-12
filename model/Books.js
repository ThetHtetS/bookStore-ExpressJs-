const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'book must have title'],
      unique: true
    },
    author: {
      type: String,
      required: [true, 'author field  is necessary']
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
    },
    photo: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Books', BookSchema);

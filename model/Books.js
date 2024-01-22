const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'book must have title'],
      unique: true
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

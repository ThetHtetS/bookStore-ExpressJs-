const mongoose = require('mongoose');
const Book = require('./Books');

const Schema = mongoose.Schema;
const OrderSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    // orderItem: {
    //   type: [
    //     {
    //       book: { type: Schema.Types.ObjectId, ref: 'Books' },
    //       qty: { type: Number }
    //     }
    //   ],
    //   required: true
    // },
    orderItem: [
      {
        book: { type: Schema.Types.ObjectId, ref: 'Books' },
        qty: { type: Number }
        // required: true
      }
    ],
    status: {
      type: String,
      default: 'Pending'
    },
    uid: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

OrderSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'orderItem',
    populate: { path: 'book', select: '-createdAt -updatedAt -__v' }
  }).select('-createdAt -updatedAt -__v -uid');
  next();
});

OrderSchema.statics.reduceStock = async function(orderItem) {
  return new Promise((resolve, reject) => {
    let stockAvailable = [];
    orderItem.forEach(async (element, index, array) => {
      const book = await Book.findById(element.book);
      if (book.qty >= element.qty) {
        book.qty -= element.qty;
        stockAvailable.push(element);
      } else if (book.qty !== 0) {
        element.qty = book.qty;
        stockAvailable.push(element);
        book.qty = 0;
      }
      book.save({ validateBeforeSave: false });
      if (index === array.length - 1) resolve(stockAvailable);
    });
  });
};

OrderSchema.pre('save', async function() {
  this.orderItem = await this.constructor.reduceStock(this.orderItem);
});

module.exports = mongoose.model('Orders', OrderSchema);

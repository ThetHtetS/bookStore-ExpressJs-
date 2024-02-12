const mongoose = require('mongoose');
//const orderItem = require('./orderItem');

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
module.exports = mongoose.model('Orders', OrderSchema);

const mongoose = require('mongoose');
const orderItem = require('./orderItem');

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
    orderItem: {
      type: [
        {
          book: { type: Schema.Types.ObjectId, ref: 'Books' },
          qty: { type: Number }
        }
      ],
      required: true
    },
    status: {
      type: String
    },
    uid: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);
module.exports = mongoose.model('Orders', OrderSchema);

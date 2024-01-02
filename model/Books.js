
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }, 
    category: {
        type: Schema.Types.ObjectId,
        ref: "Categories"
    },
    qty: {
        type: Number,
        required: true,
    },
},{ timestamps: true });
// BookSchema.virtual('posts', {
//     ref: 'Orders',
//     localField: '_id',
//     foreignField: 'orderItem'
//   });
module.exports = mongoose.model('Books',BookSchema);
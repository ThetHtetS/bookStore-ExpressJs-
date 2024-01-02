
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

   
const ReviewSchema = new Schema({
   
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    book: {
        type: Schema.Types.ObjectId,
        ref: "Books"
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    

});
module.exports = mongoose.model('Reviews', ReviewSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'category name is necessary']
  }
});
module.exports = mongoose.model('Categories', CategorySchema);

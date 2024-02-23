const Categories = require('../model/Category');

const getAllCategories = async () => {
  return Categories.find();
};

const newCategory = async category => {
  const newCat = new Categories(category);
  return newCat.save();
};

const getCategoryById = async CategoryId => {
  return Categories.findById(CategoryId);
};

async function updateCategory(categoryId, category) {
  const updatedCat = await Categories.findByIdAndUpdate(categoryId, category, {
    new: true
  });
  return updatedCat;
}

async function deleteCategory(categoryId) {
  const deletedCategory = await Categories.findByIdAndDelete(categoryId);
  return deletedCategory;
}

const getTotalCategory = async () => {
  const length = await Categories.countDocuments();
  return length;
};
module.exports = {
  getAllCategories,
  newCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getTotalCategory
};

const CategoryService = require('../service/CategoryService');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await CategoryService.getAllCategories();
  res.status(200).json({
    status: 'success',
    results: categories.length,
    categories
  });
});

const getCategory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const category = await CategoryService.getCategoryById(id);
  if (!category)
    if (!category) {
      return next(new AppError('No category found with this ID', 404));
    }
  res.status(200).json({
    status: 'success',
    category: [category]
  });
});

const createCategory = catchAsync(async (req, res, next) => {
  const category = await CategoryService.newCategory(req.body);
  if (!category) return next(new AppError('cannot save category', 400));
  res.status(201).json({ status: 'success', category });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.id;
  const category = await CategoryService.updateCategory(categoryId, req.body);
  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    category
  });
});

const deleteCategory = catchAsync(async (req, res, next) => {
  const categoryId = req.params.id;
  const category = await CategoryService.deleteCategory(categoryId);
  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  await res.status(200).json({
    status: 'success',
    category
  });
});

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};

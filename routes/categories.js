var express = require('express');
var router = express.Router();
var categories = require('../controller/CategoryController');

router.get('/', categories.getAllCategories);
router.post('/', categories.newCategory);
router.get('/:id', categories.getCategoryById);
router.put('/:id',categories.updateCategory);
router.delete('/:id',categories.deleteCategory);
module.exports =router;
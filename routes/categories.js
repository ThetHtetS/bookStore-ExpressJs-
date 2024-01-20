const express = require('express');
const categories = require('../controller/CategoryController');

const router = express.Router();

router.get('/', categories.getAllCategories);
router.post('/', categories.createCategory);
router.get('/:id', categories.getCategory);
router.put('/:id', categories.updateCategory);
router.delete('/:id', categories.deleteCategory);

module.exports = router;

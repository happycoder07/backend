const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.route('/')
    .get(protect, authorize('admin', 'manager'), getCategories)
    .post(protect, authorize('admin', 'manager'), createCategory);

router.route('/:id')
    .get(protect, authorize('admin', 'manager'), getCategory)
    .put(protect, authorize('admin', 'manager'), updateCategory)
    .delete(protect, authorize('admin', 'manager'), deleteCategory);

module.exports = router;

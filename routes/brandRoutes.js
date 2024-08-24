const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getBrands, getBrand, createBrand, updateBrand, deleteBrand } = require('../controllers/brandController');

router.route('/')
    .get(protect, authorize('admin', 'manager'), getBrands)
    .post(protect, authorize('admin', 'manager'), createBrand);

router.route('/:id')
    .get(protect, authorize('admin', 'manager'), getBrand)
    .put(protect, authorize('admin', 'manager'), updateBrand)
    .delete(protect, authorize('admin', 'manager'), deleteBrand);

module.exports = router;

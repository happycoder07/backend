const express = require('express');
const router = express.Router();
const { getSuppliers, addSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, authorize('admin', 'manager'), getSuppliers)
    .post(protect, authorize('admin'), addSupplier);

router.route('/:id')
    .put(protect, authorize('admin'), updateSupplier)
    .delete(protect, authorize('admin'), deleteSupplier);

module.exports = router;

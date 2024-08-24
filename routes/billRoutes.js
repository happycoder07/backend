const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getBills, getBill, createBill, updateBill, deleteBill } = require('../controllers/billController');

router.route('/')
    .get(protect, authorize('admin', 'manager'), getBills)
    .post(protect, authorize('admin', 'manager'), createBill);

router.route('/:id')
    .get(protect, authorize('admin', 'manager'), getBill)
    .put(protect, authorize('admin', 'manager'), updateBill)
    .delete(protect, authorize('admin', 'manager'), deleteBill);

module.exports = router;

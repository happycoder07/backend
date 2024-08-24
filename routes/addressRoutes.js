const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getAddresses, getAddress, createAddress, updateAddress, deleteAddress } = require('../controllers/addressController');

router.route('/')
    .get(protect, authorize('admin', 'manager'), getAddresses)
    .post(protect, authorize('admin', 'manager'), createAddress);

router.route('/:id')
    .get(protect, authorize('admin', 'manager'), getAddress)
    .put(protect, authorize('admin', 'manager'), updateAddress)
    .delete(protect, authorize('admin', 'manager'), deleteAddress);

module.exports = router;

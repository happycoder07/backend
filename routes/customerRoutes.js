const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');

router.route('/')
    .get(protect, authorize('admin', 'manager'), getCustomers)
    .post(protect, authorize('admin', 'manager'), createCustomer);

router.route('/:id')
    .get(protect, authorize('admin', 'manager'), getCustomer)
    .put(protect, authorize('admin', 'manager'), updateCustomer)
    .delete(protect, authorize('admin', 'manager'), deleteCustomer);

module.exports = router;

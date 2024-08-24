const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getInventoryItems, getInventoryItem, createInventoryItem, updateInventoryItem, deleteInventoryItem } = require('../controllers/inventoryController');

router.route('/')
    .get(protect, authorize('admin', 'manager'), getInventoryItems)
    .post(protect, authorize('admin', 'manager'), createInventoryItem);

router.route('/:id')
    .get(protect, authorize('admin', 'manager'), getInventoryItem)
    .put(protect, authorize('admin', 'manager'), updateInventoryItem)
    .delete(protect, authorize('admin', 'manager'), deleteInventoryItem);

module.exports = router;

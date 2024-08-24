const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

// Example routes
router.route('/').get(protect, authorize('admin'),getUsers).post(protect, authorize('admin'),createUser);

router.route('/:id')
    .get(protect, authorize('admin'),getUserById)
    .put(protect, authorize('admin'), updateUser)
    .delete(protect, authorize('admin'), deleteUser);

module.exports = router;

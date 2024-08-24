const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/auth/login
// @desc    Authenticate user & get token (Login)
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        res.status(400).json({ message: 'Please provide email and password' });
        return;
    }

    // Check if user exists with the provided email
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }
    
    const hashedPassword = await bcrypt.hash(password, '$2a$10$XZVtvciIGYz1z/msoli2eu');
    console.log('Hashed password:', hashedPassword);
    // Check if password matches using bcryptjs
    const isMatch = await bcrypt.compare(hashedPassword, user.password);

    if (!isMatch) {
        res.status(401).json({ message: 'Invalid Password' });
        return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d' // Token expires in 30 days
    });

    res.cookie('token', token, {
        maxAge: 900000, // Cookie will expire in 15 minutes
        httpOnly: true, // Cookie is only accessible by the web server
        secure: process.env.NODE_ENV === 'production', // Send cookie over HTTPS only in production
      });


    res.json(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    );
}));

// @route   POST /api/auth/logout
// @desc    Clear token from headers (Logout)
// @access  Private
router.post('/logout', protect, (req, res) => {
    // Clear token from headers
    res.clearCookie('token'); // If using cookies
  //  res.setHeader('Authorization', ''); // If using headers
    res.status(200).json({ message: 'Logout successful' });

});
module.exports = router;

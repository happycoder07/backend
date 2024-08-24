const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Address = require('../models/Address');
const bcrypt = require('bcryptjs');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (requires token)
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Private (requires token)
const getUserById = asyncHandler(async (req, res) => {
    console.log(req.params.id)
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    else {
    res.status(200).json(user);
    }
});

// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, contactNumber, profileImage, address, role } = req.body;

    let addressObj;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    
    // Check if address is provided as an object, create address if necessary
    if (address && typeof address === 'object') {
        try {
            addressObj = await Address.create(address);
        } catch (error) {
            res.status(400);
            throw new Error('Invalid address data');
        }
    } else if (typeof address === 'string') {
        // Assume address is already an ObjectId
        addressObj = await Address.findById(address);
        if (!addressObj) {
            res.status(400);
            throw new Error('Invalid address ID');
        }
    }

    hashedPassword = await bcrypt.hash(password, '$2a$10$XZVtvciIGYz1z/msoli2eu');


    const newUser = new User({
        name,
        email,
        password:hashedPassword,
        contactNumber,
        profileImage,
        address: addressObj._id,
        role
    });

    await newUser.save();

    res.status(201).json(newUser);
});

// @desc    Update user by ID
// @route   PUT /api/users/:id
// @access  Private (requires token)
const updateUser = asyncHandler(async (req, res) => {
    const { name, email, contactNumber, profileImage, address, role } = req.body;

    let addressObj;

    // Check if address is provided as an object, create address if necessary
    if (address && typeof address === 'object') {
        try {
            addressObj = await Address.create(address);
        } catch (error) {
            res.status(400);
            throw new Error('Invalid address data');
        }
    } else if (typeof address === 'string') {
        // Assume address is already an ObjectId
        addressObj = await Address.findById(address);
        if (!addressObj) {
            res.status(400);
            throw new Error('Invalid address ID');
        }
    }

    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.contactNumber = contactNumber || user.contactNumber;
    user.profileImage = profileImage || user.profileImage;
    user.address = addressObj ? addressObj._id : user.address;
    user.role = role || user.role;

    await user.save();

    res.json(user);
});

// @desc    Delete user by ID
// @route   DELETE /api/users/:id
// @access  Private (requires token and admin role)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    await user.remove();

    res.json({ message: 'User removed' });
});

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

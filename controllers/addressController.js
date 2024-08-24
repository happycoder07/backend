const Address = require('../models/Address');

// @desc    Get all addresses
// @route   GET /api/addresses
// @access  Private (requires token)
const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single address by ID
// @route   GET /api/addresses/:id
// @access  Private (requires token)
const getAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a new address
// @route   POST /api/addresses
// @access  Private (requires token)
const createAddress = async (req, res) => {
    const { street, city, state, zip, country } = req.body;

    try {
        const newAddress = new Address({ street, city, state, zip, country });
        const savedAddress = await newAddress.save();

        res.status(201).json(savedAddress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update address by ID
// @route   PUT /api/addresses/:id
// @access  Private (requires token)
const updateAddress = async (req, res) => {
    const { street, city, state, zip, country } = req.body;

    try {
        let address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        address.street = street;
        address.city = city;
        address.state = state;
        address.zip = zip;
        address.country = country;
        await address.save();

        res.json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete address by ID
// @route   DELETE /api/addresses/:id
// @access  Private (requires token)
const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        await address.remove();
        res.json({ message: 'Address removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAddresses,
    getAddress,
    createAddress,
    updateAddress,
    deleteAddress
};

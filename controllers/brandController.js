const Brand = require('../models/Brand');

// @desc    Get all brands
// @route   GET /api/brands
// @access  Private (requires token)
const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single brand by ID
// @route   GET /api/brands/:id
// @access  Private (requires token)
const getBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        res.json(brand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a new brand
// @route   POST /api/brands
// @access  Private (requires token)
const createBrand = async (req, res) => {
    const { name,description } = req.body;

    try {
        const newBrand = new Brand({ name,description });
        const savedBrand = await newBrand.save();

        res.status(201).json(savedBrand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update brand by ID
// @route   PUT /api/brands/:id
// @access  Private (requires token)
const updateBrand = async (req, res) => {
    const { name,description } = req.body;

    try {
        let brand = await Brand.findById(req.params.id);

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        brand.name = name;
        brand.description=description;

        await brand.save();

        res.json(brand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete brand by ID
// @route   DELETE /api/brands/:id
// @access  Private (requires token)
const deleteBrand = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        await brand.remove();
        res.json({ message: 'Brand removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
};

const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private (requires token)
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Private (requires token)
const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private (requires token)
const createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newCategory = new Category({ name, description });
        const savedCategory = await newCategory.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update category by ID
// @route   PUT /api/categories/:id
// @access  Private (requires token)
const updateCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        let category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name;
        category.description = description;
        await category.save();

        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete category by ID
// @route   DELETE /api/categories/:id
// @access  Private (requires token)
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.remove();
        res.json({ message: 'Category removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};

const Customer = require('../models/Customer');

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private (requires token)
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().populate('address');
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single customer by ID
// @route   GET /api/customers/:id
// @access  Private (requires token)
const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).populate('address');

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a new customer
// @route   POST /api/customers
// @access  Private (requires token)
const createCustomer = async (req, res) => {
    const { name, email, phone, address } = req.body;

    try {
        const newCustomer = new Customer({ name, email, phone, address });
        const savedCustomer = await newCustomer.save();

        res.status(201).json(savedCustomer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update customer by ID
// @route   PUT /api/customers/:id
// @access  Private (requires token)
const updateCustomer = async (req, res) => {
    const { name, email, phone, address } = req.body;

    try {
        let customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        customer.name = name;
        customer.email = email;
        customer.phone = phone;
        customer.address = address;
        await customer.save();

        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete customer by ID
// @route   DELETE /api/customers/:id
// @access  Private (requires token)
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        await customer.remove();
        res.json({ message: 'Customer removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
};

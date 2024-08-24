const Supplier = require('../models/Supplier');
const Address = require('../models/Address');

// @desc    Get all suppliers
// @route   GET /api/suppliers
// @access  Private
const getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find().populate('officeAddress warehouseAddress');
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a supplier
// @route   POST /api/suppliers
// @access  Private
const addSupplier = async (req, res) => {
    const { name, officeAddress, warehouseAddress, contactNo, mobileNo, gstNo, cinNo } = req.body;

    try {
        const newSupplier = new Supplier({
            name,
            officeAddress,
            warehouseAddress,
            contactNo,
            mobileNo,
            gstNo,
            cinNo
        });

        const savedSupplier = await newSupplier.save();
        const populatedSupplier = await Supplier.findById(savedSupplier._id).populate('officeAddress warehouseAddress');
        res.status(201).json(populatedSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a supplier
// @route   PUT /api/suppliers/:id
// @access  Private
const updateSupplier = async (req, res) => {
    const { name, officeAddress, warehouseAddress, contactNo, mobileNo, gstNo, cinNo } = req.body;

    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        supplier.name = name || supplier.name;
        supplier.officeAddress = officeAddress || supplier.officeAddress;
        supplier.warehouseAddress = warehouseAddress || supplier.warehouseAddress;
        supplier.contactNo = contactNo || supplier.contactNo;
        supplier.mobileNo = mobileNo || supplier.mobileNo;
        supplier.gstNo = gstNo || supplier.gstNo;
        supplier.cinNo = cinNo || supplier.cinNo;

        const updatedSupplier = await supplier.save();
        const populatedSupplier = await Supplier.findById(updatedSupplier._id).populate('officeAddress warehouseAddress');
        res.json(populatedSupplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a supplier
// @route   DELETE /api/suppliers/:id
// @access  Private
const deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        await supplier.remove();
        res.json({ message: 'Supplier removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier
};

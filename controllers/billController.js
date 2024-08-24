const Bill = require('../models/Bill');
const { validationResult } = require('express-validator');

// @desc    Get all bills
// @route   GET /api/bills
// @access  Private (requires token)
const getBills = async (req, res) => {
    try {
        const bills = await Bill.find().populate('customer billingAddress shippingAddress modeOfPayment items.inventoryItem');
        res.json(bills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single bill by ID
// @route   GET /api/bills/:id
// @access  Private (requires token)
const getBill = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id).populate('customer billingAddress shippingAddress modeOfPayment items.inventoryItem');
        
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        
        res.json(bill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Create a new bill
// @route   POST /api/bills
// @access  Private (requires token)
const createBill = async (req, res) => {
    const {
        customer,
        billNo,
        date,
        billingAddress,
        shippingAddress,
        totalCost,
        modeOfPayment,
        remarks,
        items
    } = req.body;

    try {
        const newBill = new Bill({
            customer,
            billNo,
            date,
            billingAddress,
            shippingAddress,
            totalCost,
            modeOfPayment,
            remarks,
            items
        });

        const savedBill = await newBill.save();
        res.status(201).json(savedBill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update bill by ID
// @route   PUT /api/bills/:id
// @access  Private (requires token)
const updateBill = async (req, res) => {
    const {
        customer,
        billNo,
        date,
        billingAddress,
        shippingAddress,
        totalCost,
        modeOfPayment,
        remarks,
        items
    } = req.body;

    try {
        let bill = await Bill.findById(req.params.id);

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        bill.customer = customer;
        bill.billNo = billNo;
        bill.date = date;
        bill.billingAddress = billingAddress;
        bill.shippingAddress = shippingAddress;
        bill.totalCost = totalCost;
        bill.modeOfPayment = modeOfPayment;
        bill.remarks = remarks;
        bill.items = items;

        await bill.save();
        res.json(bill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete bill by ID
// @route   DELETE /api/bills/:id
// @access  Private (requires token)
const deleteBill = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);

        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }

        await bill.remove();
        res.json({ message: 'Bill removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getBills,
    getBill,
    createBill,
    updateBill,
    deleteBill
};

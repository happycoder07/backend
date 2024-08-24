const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    billNo: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now, required: true },
    billingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    totalCost: { type: Number, required: true },
    modeOfPayment: { type: mongoose.Schema.Types.ObjectId, ref: 'ModeOfPayment', required: true },
    remarks: { type: String },
    items: [{
        inventoryItem: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
        quantity: { type: Number, required: true },
        cost: { type: Number, required: true }
    }],
    createdAt: { type: Date, default: Date.now }
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;

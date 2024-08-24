const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    barCodeNo: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    purchaseCost: { type: Number, required: true },
    sellingCost: { type: Number, required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    discount: { type: Number, default: 0 },
    manufactureDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    warranty: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;

const InventoryItem = require('../models/InventoryItem');

const getInventoryItems = async (req, res) => {
    const items = await InventoryItem.find({})
        .populate('category', 'name')
        .populate('brand', 'name')
        .populate('image', 'url altText')
        .populate('supplier', 'name');
    res.json(items);
};


const getInventoryItem = async (req, res) => {
    try {
        const inventoryItem = await InventoryItem.findById(req.params.id);

        if (!inventoryItem) {
            return res.status(404).json({ message: 'Inventory item not found' });
        }

        res.json(inventoryItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createInventoryItem = async (req, res) => {
    const {
        name,
        barCodeNo,
        quantity,
        purchaseCost,
        sellingCost,
        supplier,
        category,
        brand,
        discount,
        manufactureDate,
        expiryDate,
        image,
        warranty
    } = req.body;

    const item = new InventoryItem({
        name,
        barCodeNo,
        quantity,
        purchaseCost,
        sellingCost,
        supplier,
        category,
        brand,
        discount,
        manufactureDate,
        expiryDate,
        image,
        warranty
    });

    await item.save();
    res.status(201).json(item);
};

const updateInventoryItem = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        barCodeNo,
        quantity,
        purchaseCost,
        sellingCost,
        supplier,
        category,
        brand,
        discount,
        manufactureDate,
        expiryDate,
        image,
        warranty
    } = req.body;

    const item = await InventoryItem.findById(id);

    if (item) {
        item.name = name || item.name;
        item.barCodeNo = barCodeNo || item.barCodeNo;
        item.quantity = quantity || item.quantity;
        item.purchaseCost = purchaseCost || item.purchaseCost;
        item.sellingCost = sellingCost || item.sellingCost;
        item.supplier = supplier || item.supplier;
        item.category = category || item.category;
        item.brand = brand || item.brand;
        item.discount = discount || item.discount;
        item.manufactureDate = manufactureDate || item.manufactureDate;
        item.expiryDate = expiryDate || item.expiryDate;
        item.image = image || item.image;
        item.warranty = warranty || item.warranty;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
};

const deleteInventoryItem = async (req, res) => {
    const { id } = req.params;
    const item = await InventoryItem.findById(id);

    if (item) {
        await item.remove();
        res.json({ message: 'Item removed' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
};

module.exports = {
    getInventoryItems,
    getInventoryItem,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
};

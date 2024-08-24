const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    officeAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    warehouseAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    gstNo: {
        type: String,
        required: true
    },
    cinNo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Supplier', supplierSchema);

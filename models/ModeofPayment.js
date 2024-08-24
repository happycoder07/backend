const mongoose = require('mongoose');

const modeOfPaymentSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., Cash, Credit Card, Debit Card, Net Banking
    details: { type: String } // e.g., last 4 digits of card, transaction ID, etc.
});

const ModeOfPayment = mongoose.model('ModeOfPayment', modeOfPaymentSchema);

module.exports = ModeOfPayment;

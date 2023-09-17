const mongoose = require("mongoose");

const PaymentMethod = new mongoose.Schema({
    paymentType: { type: String, required: true },
    cardName: { type: String, required: false },
    cardNumber: { type: String, required: false },
    cardExpiry: { type: String, required: false },
    upiId: { type: String, required: false },
    userId: { type: String, required: true },
});

const model = mongoose.model("PaymentMethod", PaymentMethod);

module.exports = model;

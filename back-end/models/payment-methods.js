const mongoose = require("mongoose");

const PaymentMethod = new mongoose.Schema({
    paymentType: { tpe: String, required: true },
    cardName: { type: String, required: false },
    cardNumber: { type: String, required: false },
    cardExpiry: { type: String, required: false },
    upiId: { type: String, required: false },
    cash: { type: String, required: false },
});

const model = mongoose.model("PaymentMethod", PaymentMethod);

module.exports = model;

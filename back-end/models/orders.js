const mongoose = require("mongoose");
const SingleItemOrder = require("./item-order").schema;

const Orders = new mongoose.Schema({
    paymentMethod: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    orderDate: { type: Date, default: Date.now, required: true },
    totalPrice: { type: Number, required: true, min: 1 },
    items: [SingleItemOrder],
    userId: { type: String, required: true },
});

const model = mongoose.model("Orders", Orders);

module.exports = model;

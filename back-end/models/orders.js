const mongoose = require("mongoose");

const Orders = new mongoose.Schema({
    paymentMethod: {type: String, required: true},
    shippingAddress: {type: String, required: true},
    shippingMethod: {type: String, required: true},
    orderStatus: {type: String, required: true},
    orderDate: {type: String, required: true},
    totalAmount: {type: Number, required: true},
    discount: {type: Number, required: false},
    finalAmount: {type: Number, required: true},
    itemsOrdered: {type: Array, required: true}
});

const model = mongoose.model("Orders", Orders);

module.exports = model;

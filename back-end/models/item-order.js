const mongoose = require("mongoose");

const SingleItemOrdered = new mongoose.Schema({
    price: {type: Number, required: true, min: 1},
    quantity: {type: Number, required: true, min: 1},
    totalPrice: {type: Number, required: true, min: 1},
    productId: {type: String, required: true},
    productDiscount: {type: Number, required: false, min: 0}
});

const model = mongoose.model("ItemOrder", SingleItemOrdered);

module.exports = model;

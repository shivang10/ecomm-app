const mongoose = require("mongoose");

const SingleItemOrdered = new mongoose.Schema({
    price: { type: Number, required: true, min: 1 },
    quantity: { type: Number, required: true, min: 1 },
    priceBeforeDiscount: { type: Number, required: true, min: 1 },
    priceAfterDiscount: { type: Number, required: true, min: 1 },
    productId: { type: String, required: true },
    productVariationId: { type: [String], required: true },
    productDiscount: { type: Number, required: false, min: 0 },
    orderStatus: { type: String, required: true },
    sellerId: { type: String, required: true },
});

const model = mongoose.model("SingleItemOrdered", SingleItemOrdered);

module.exports = model;

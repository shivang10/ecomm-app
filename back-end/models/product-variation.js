const mongoose = require("mongoose");

const ProductVariation = new mongoose.Schema({
    property: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    quantity: { type: Number, required: true, min: 0 },
});

const model = mongoose.model("ProductVariation", ProductVariation);
module.exports = model;

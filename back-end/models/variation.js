const mongoose = require("mongoose");

const Variation = new mongoose.Schema({
    productId: {type: String, required: true},
    property: {type: String, required: true},
    price: {type: Number, required: true, min: 1},
    quantity: {type: Number, required: true, min: 0}
})

const model = mongoose.model("Variation", Variation);
module.exports = model;

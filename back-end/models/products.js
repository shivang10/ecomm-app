const mongoose = require("mongoose");
const Variation = require("./product-variation");

const Products = new mongoose.Schema({
    name: {type: String, required: true},
    sellerId: {type: String, required: true},
    tags: {type: [String], req: true},
    variation: {type: [Variation.schema], required: true},
    description: {type: String, required: true}
});

const model = mongoose.model("Products", Products);

module.exports = model;

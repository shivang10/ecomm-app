const mongoose = require("mongoose");
const Variation = require("./variation");

const Products = new mongoose.Schema({
    name: {type: String, required: true},
    sellerId: {type: String, required: true},
    tags: {type: [String], req: true},
    variation: {type: [Variation], required: true},
    description: {type: String, required: false}
});

const model = mongoose.model("Products", Products);

module.exports = model;

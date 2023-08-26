const mongoose = require("mongoose");

const ProductCategories = new mongoose.Schema({
    category: { type: String, required: true, unique: true },
});

const model = mongoose.model("ProductCategories", ProductCategories);
module.exports = model;

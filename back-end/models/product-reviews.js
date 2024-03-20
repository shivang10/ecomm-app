const mongoose = require("mongoose");

const ProductReview = new mongoose.Schema({
    userId: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    description: { type: String, required: false },
});

const model = mongoose.model("ProductReview", ProductReview);

module.exports = model;

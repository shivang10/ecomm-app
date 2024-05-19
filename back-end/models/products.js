const mongoose = require("mongoose");
const Variation = require("./product-variation");
const Reviews = require("./product-reviews");

const Products = new mongoose.Schema({
    name: { type: String, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Sellers" },
    tags: { type: [String], req: true },
    variation: { type: [Variation.schema], required: true },
    description: { type: String, required: true },
    reviews: { type: [Reviews.schema], required: false },
    noOfReviews: { type: Number, required: false, default: 0 },
    totalReviewsScore: { type: Number, required: false, default: 0 },
});

const model = mongoose.model("Products", Products);

module.exports = model;

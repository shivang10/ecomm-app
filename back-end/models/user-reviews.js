const mongoose = require("mongoose");

const UserReview = new mongoose.Schema({
    userId: { type: String, required: true },
    orderedProductId: { type: String, required: true },
    ratingValue: {
        type: Number, required: true, min: 1, max: 5,
    },
    comment: { type: String, required: false },
});

const model = mongoose.model("UserReview", UserReview);

module.exports = model;

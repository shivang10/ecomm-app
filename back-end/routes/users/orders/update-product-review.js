const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const generateObjectId = require("../../../utils/generate-object-id");
const ProductSchema = require("../../../models/products");

router.post("/:id/:rid", validateUserToken, async (req, res) => {
    const userId = generateObjectId(req.params.id);
    const reviewId = generateObjectId(req.params.rid);
    const { rating, description } = req.body;
    if (!rating) {
        return res.status(400).send(apiResponse(null, "Please fill all the details."));
    }
    try {
        const userReviewExist = await ProductSchema.findOne({ "reviews._id": reviewId }, {
            _id: 1, name: 1, totalReviewsScore: 1, "reviews.$": 1,
        });

        if (!userReviewExist || userReviewExist.reviews.length <= 0) {
            return res.status(500).send(apiResponse(null, "You cannot edit this review."));
        }

        const reviewData = {
            userId, rating, description, _id: reviewId,
        };
        const newRating = rating - userReviewExist.reviews[0].rating;

        await ProductSchema.updateOne({ "reviews._id": reviewId }, {
            $set: { "reviews.$": reviewData }, $inc: { totalReviewsScore: newRating },
        });

        return res.status(200).send(apiResponse(null, "Review successfully updated."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to edit your review."));
    }
});

module.exports = router;

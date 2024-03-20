const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const OrdersSchema = require("../../../models/orders");
const generateObjectId = require("../../../utils/generate-object-id");
const ReviewSchema = require("../../../models/product-reviews");
const ProductSchema = require("../../../models/products");

router.post("/:id/:oid/:pid", validateUserToken, async (req, res) => {
    const userId = generateObjectId(req.params.id);
    const orderId = generateObjectId(req.params.oid);
    const productId = generateObjectId(req.params.pid);
    const { rating, description } = req.body;
    if (!rating) {
        return res.status(400).send(apiResponse(null, "Please fill all the details."));
    }
    try {
        const checkOrderExistQuery = { _id: orderId, "items.productId": productId };
        const productBoughtByUser = await OrdersSchema.find(checkOrderExistQuery);
        if (!productBoughtByUser || productBoughtByUser.length === 0) {
            return res.status(500).send(apiResponse(null, "Cannot add the review as the you have not bought this product."));
        }

        const userReviewExist = await ProductSchema.findOne({ "reviews.userId": userId }, { _id: 1, name: 1 });

        if (userReviewExist) {
            return res.status(500).send(apiResponse(null, "Cannot again add the review as the you have already reviewed it."));
        }

        const reviewData = new ReviewSchema({ userId, rating, description });

        await ProductSchema.updateOne({ _id: productId }, {
            $push: { reviews: reviewData }, $inc: { noOfReviews: 1, totalReviewsScore: rating },
        });

        return res.status(200).send(apiResponse(null, "Review successfully added."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to post your review."));
    }
});

module.exports = router;

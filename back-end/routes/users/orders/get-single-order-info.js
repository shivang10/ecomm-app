const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const OrdersSchema = require("../../../models/orders");
const UserSchema = require("../../../models/user");
const ProductSchema = require("../../../models/products");
const generateObjectId = require("../../../utils/generate-object-id");

router.get("/:id/:oid", validateUserToken, async (req, res) => {
    const orderId = generateObjectId(req.params.oid);
    const userId = generateObjectId(req.params.id);

    try {
        const pastOrders = await OrdersSchema.find({ _id: orderId }).populate("items.productId", "name variation tags").lean();
        const addressId = generateObjectId(pastOrders[0].shippingAddress);
        const userAddressDetails = await UserSchema.findOne({ _id: userId, "address._id": addressId }, { "address.$": 1 });
        const itemsReviews = {};
        const itemsReviewQuery = pastOrders[0].items.map((item) => {
            const product = item.productId;
            // eslint-disable-next-line no-underscore-dangle
            const productId = product._id;
            return { _id: productId, "reviews.userId": userId };
        });

        const itemsReviewDetails = await ProductSchema.find({ $or: itemsReviewQuery }, { "reviews.$": 1 });
        itemsReviewDetails.forEach((item) => {
            if (item.reviews.length > 0) {
                // eslint-disable-next-line prefer-destructuring,no-underscore-dangle
                itemsReviews[item._id] = item.reviews[0];
            }
        });

        const items = pastOrders[0].items.map((item) => {
            const product = item.productId;
            // eslint-disable-next-line no-underscore-dangle
            const productId = product._id;
            const totalPrice = item.quantity * item.priceAfterDiscount;
            const currItemReview = itemsReviews[productId] || {};
            return {
                ...item,
                productId,
                name: product.name,
                tags: product.tags,
                variation: product.variation,
                totalPrice,
                review: currItemReview,
            };
        });

        const finalOrderDetails = {
            ...pastOrders[0], shippingAddress: userAddressDetails.address[0], items,
        };

        return res.status(200).send(apiResponse(finalOrderDetails, "Order info is successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to fetch order info."));
    }
});

module.exports = router;

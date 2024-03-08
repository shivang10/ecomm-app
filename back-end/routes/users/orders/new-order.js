const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const UserSchema = require("../../../models/user");
const OrdersSchema = require("../../../models/orders");
const processOrderedItems = require("../../../utils/process-ordered-items");
const updateItemsQuantity = require("../../../utils/update-items-quantity");

router.post("/:id", validateUserToken, async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).send(apiResponse(null, "UserId is required"));
    }

    const orderDetails = req.body;
    const {
        items, paymentMethod, shippingAddress,
    } = orderDetails;
    if (!items || items?.length === 0) {
        return res.status(400).send(apiResponse(null, "No items are present. Cannot place order."));
    }

    try {
        const userDetails = await UserSchema.findById({ _id: userId }, { email: 1 });

        if (!userDetails) {
            return res.status(400).send(apiResponse(null, "No such user exists"));
        }
        const allItems = await processOrderedItems(items);
        const totalPrice = allItems.reduce((accumulator, currentItem) => accumulator + currentItem.priceAfterDiscount, 0);

        const finalOrder = {
            paymentMethod,
            shippingAddress,
            items: allItems,
            totalPrice,
            userId,
        };

        const orderInfo = await OrdersSchema.create(finalOrder);

        updateItemsQuantity(items, true);

        return res.status(200).send(apiResponse(orderInfo, "Your order has been successfully placed."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to place your order. Please try after sometime."));
    }
});

module.exports = router;

const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const OrdersSchema = require("../../../models/orders");
const processOrderedItems = require("../../../utils/process-ordered-items");
const updateItemsQuantity = require("../../../utils/update-items-quantity");
const generateObjectId = require("../../../utils/generate-object-id");

router.post("/:id", validateUserToken, async (req, res) => {
    const userId = generateObjectId(req.params.id);
    const {
        items, paymentMethod, shippingAddress,
    } = req.body;
    if (!items || items?.length === 0) {
        return res.status(400).send(apiResponse(null, "No items are present. Cannot place order."));
    }
    try {
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
        await updateItemsQuantity(items, true);

        return res.status(200).send(apiResponse(orderInfo, "Your order has been successfully placed."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to place your order. Please try after sometime."));
    }
});

module.exports = router;

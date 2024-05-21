const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const OrdersSchema = require("../../../models/orders");
const generateObjectId = require("../../../utils/generate-object-id");
const validateUserToken = require("../../../middlewares/validate-user-token");
const orderStatusEnums = require("../../../utils/order-status-enums");

router.get("/:uid/:oid/:iid", validateUserToken, async (req, res) => {
    const userId = generateObjectId(req.params.uid);
    const orderId = generateObjectId(req.params.oid);
    const itemId = generateObjectId(req.params.iid);

    try {
        const updateQuery = { _id: orderId, userId, "items._id": itemId };
        const setQuery = { $set: { "items.$.orderStatus": orderStatusEnums.userCancelled } };
        await OrdersSchema.updateOne(updateQuery, setQuery);
        const updatedOrder = await OrdersSchema.find(updateQuery, { "items.$": 1 });
        return res.status(200).send(apiResponse(updatedOrder, "Item is successfully cancelled."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to cancel your order."));
    }
});

module.exports = router;

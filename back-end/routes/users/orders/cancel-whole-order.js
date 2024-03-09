const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const OrdersSchema = require("../../../models/orders");
const generateObjectId = require("../../../utils/generate-object-id");
const validateUserToken = require("../../../middlewares/validate-user-token");
const orderStatusEnums = require("../../../utils/order-status-enums");

router.get("/:uid/:oid", validateUserToken, async (req, res) => {
    const orderId = generateObjectId(req.params.oid);

    try {
        const updateQuery = { _id: orderId };
        const setQuery = { $set: { "items.$[].orderStatus": orderStatusEnums.userCancelled } };
        await OrdersSchema.updateMany(updateQuery, setQuery);
        const updatedOrder = await OrdersSchema.find(updateQuery);
        return res.status(200).send(apiResponse(updatedOrder, "Order is successfully cancelled."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to cancel your order."));
    }
});

module.exports = router;

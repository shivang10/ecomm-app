const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const OrdersSchema = require("../../../models/orders");
const generateObjectId = require("../../../utils/generate-object-id");

router.get("/:id/:oid", validateUserToken, async (req, res) => {
    const orderId = generateObjectId(req.params.oid);

    try {
        const pastOrders = await OrdersSchema.find({ _id: orderId });
        return res.status(200).send(apiResponse(pastOrders, "Order info is successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to fetch order info."));
    }
});

module.exports = router;

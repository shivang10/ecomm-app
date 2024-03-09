const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const OrdersSchema = require("../../../models/orders");
const generateObjectId = require("../../../utils/generate-object-id");
const validateSellerToken = require("../../../middlewares/validate-seller-token");

router.get("/:id/:iid", validateSellerToken, async (req, res) => {
    const sellerId = generateObjectId(req.params.id);
    const orderId = generateObjectId(req.params.iid);

    try {
        const orderInfo = await OrdersSchema.find({ "items.sellerId": sellerId, "items._id": orderId }, { "items.$": 1 });
        return res.status(200).send(apiResponse(orderInfo, "Order is successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to fetch seller order."));
    }
});

module.exports = router;

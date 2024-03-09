const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const OrdersSchema = require("../../../models/orders");
const generateObjectId = require("../../../utils/generate-object-id");
const validateSellerToken = require("../../../middlewares/validate-seller-token");
const orderStatusEnums = require("../../../utils/order-status-enums");

router.put("/:id/:oid/:iid", validateSellerToken, async (req, res) => {
    const sellerId = generateObjectId(req.params.id);
    const orderId = generateObjectId(req.params.oid);
    const itemId = generateObjectId(req.params.iid);

    try {
        const { status } = req.body;
        const statusTypes = Object.keys(orderStatusEnums);
        if (!status || !statusTypes.includes(status)) {
            return res.status(500).send(apiResponse(null, "Status value not valid"));
        }
        const updateQuery = { _id: orderId, "items.sellerId": sellerId, "items._id": itemId };
        const setQuery = { $set: { "items.$.orderStatus": status } };
        await OrdersSchema.updateOne(updateQuery, setQuery);
        const updatedOrder = await OrdersSchema.find(updateQuery, { "items.$": 1 });
        return res.status(200).send(apiResponse(updatedOrder, "Order is successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to fetch seller order."));
    }
});

module.exports = router;

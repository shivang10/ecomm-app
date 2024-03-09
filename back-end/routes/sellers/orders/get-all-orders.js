const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const OrdersSchema = require("../../../models/orders");
const generateObjectId = require("../../../utils/generate-object-id");
const validateSellerToken = require("../../../middlewares/validate-seller-token");

router.get("/:id", validateSellerToken, async (req, res) => {
    const sellerId = generateObjectId(req.params.id);

    try {
        const maxProductsAllowedToBeFetched = 20;
        const limit = req.query.limit || maxProductsAllowedToBeFetched;
        const page = req.query.page || 0;
        const skipDocs = page * limit;
        const pastOrders = await OrdersSchema.find({ "items.sellerId": sellerId }, { "items.$": 1 }).skip(skipDocs).limit(limit);
        return res.status(200).send(apiResponse(pastOrders, "Orders are successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to fetch seller orders."));
    }
});

module.exports = router;

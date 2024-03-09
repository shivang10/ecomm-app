const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const OrdersSchema = require("../../../models/orders");
const generateObjectId = require("../../../utils/generate-object-id");

router.get("/:id", validateUserToken, async (req, res) => {
    const userId = generateObjectId(req.params.id);

    try {
        const maxProductsAllowedToBeFetched = 20;
        const limit = req.query.limit || maxProductsAllowedToBeFetched;
        const page = req.query.page || 0;
        const skipDocs = page * limit;
        const pastOrders = await OrdersSchema.find({ userId }).skip(skipDocs).limit(limit);
        return res.status(200).send(apiResponse(pastOrders, "Orders are successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to fetch user orders."));
    }
});

module.exports = router;

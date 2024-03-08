const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const OrdersSchema = require("../../../models/orders");

router.get("/:id", validateUserToken, async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).send(apiResponse(null, "UserId is required"));
    }

    try {
        const maxProductsAllowedToBeFetched = 20;
        const limit = Math.min(req.query.limit, maxProductsAllowedToBeFetched) || 10;
        const page = req.query.page || 1;
        const paymentMethods = await OrdersSchema.find({ userId }).skip(page).limit(limit);
        return res.status(200).send(apiResponse(paymentMethods, "Orders are successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to fetch user orders."));
    }
});

module.exports = router;

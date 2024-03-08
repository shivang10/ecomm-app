const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const PaymentMethods = require("../../../models/payment-methods");

router.get("/:id", validateUserToken, async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).send(apiResponse(null, "UserId is required"));
    }

    try {
        const paymentMethods = await PaymentMethods.find({ userId });
        return res.status(200).send(apiResponse(paymentMethods, "Payment methods details are successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to fetch user payment methods."));
    }
});

module.exports = router;

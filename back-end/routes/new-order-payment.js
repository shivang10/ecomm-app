const express = require("express");

const router = express.Router();
const apiResponse = require("../utils/api-response");
const validateUserToken = require("../middlewares/validate-user-token");
const paymentTypeEnum = require("../utils/payment-method-type");
const PaymentMethodsSchema = require("../models/payment-methods");

router.post("/:id", validateUserToken, async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).send(apiResponse(null, "UserId is required"));
    }

    const paymentRequest = req.body;
    const { paymentType } = paymentRequest;

    try {
        if (paymentType === paymentTypeEnum.cash) {
            const paymentInfo = await PaymentMethodsSchema.create({
                paymentType,
                amount: paymentRequest.amount,
                userId: paymentRequest.userId,
            });
            return res.status(200).send(apiResponse(paymentInfo, "Your payment is successfully processed."));
        } if (paymentType === paymentTypeEnum.UPI) {
            if (!paymentRequest.upiId) {
                return res.status(400).send(apiResponse(null, "UpiId is required"));
            }
            const paymentInfo = await PaymentMethodsSchema.create({
                paymentType,
                amount: paymentRequest.amount,
                upiId: paymentRequest.upiId,
                userId: paymentRequest.userId,
            });
            return res.status(200).send(apiResponse(paymentInfo, "Your payment is successfully processed."));
        }
        if (!paymentRequest.cardExpiry || !paymentRequest.cardName || !paymentRequest.cardNumber) {
            return res.status(400).send(apiResponse(null, "Card details are required is required"));
        }
        const paymentInfo = await PaymentMethodsSchema.create({
            paymentType,
            amount: paymentRequest.amount,
            cardName: paymentRequest.cardName,
            cardNumber: paymentRequest.cardNumber,
            cardExpiry: paymentRequest.cardExpiry,
            userId: paymentRequest.userId,
        });
        return res.status(200).send(apiResponse(paymentInfo, "Your payment is successfully processed."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to make payment. Please try after sometime."));
    }
});

module.exports = router;

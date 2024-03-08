const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateSellerToken = require("../../../middlewares/validate-seller-token");
const SellerSchema = require("../../../models/seller");

router.get("/:id", validateSellerToken, async (req, res) => {
    const sellerId = req.params.id;

    if (!sellerId) {
        return res.status(400).send(apiResponse(null, "SellerId is required"));
    }
    try {
        const sellerDetails = await SellerSchema.findById({ _id: sellerId }, {
            password: 0, ordersReceived: 0, homeAddress: 0,
        });

        if (!sellerDetails) {
            return res.status(400).send(apiResponse(null, "No such seller exists"));
        }
        return res.status(200).send(apiResponse(sellerDetails, "Seller details are successfully fetched"));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to find user details."));
    }
});

module.exports = router;

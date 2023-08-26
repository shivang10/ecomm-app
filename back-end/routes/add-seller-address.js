const express = require("express");

const router = express.Router();
const apiResponse = require("../utils/api-response");
const validateSellerToken = require("../middlewares/validate-seller-token");
const AddressSchema = require("../models/address");
const SellerSchema = require("../models/seller");

router.post("/:id", validateSellerToken, async (req, res) => {
    const sellerId = req.params.id;
    const {
        houseNo, streetNo, locality, landmark, city, state, pinCode,
    } = req.body;
    if (!houseNo || !sellerId || !locality || !city || !state || !pinCode) {
        return res.status(400).send(apiResponse(null, "houseNo, locality, city, state, pinCode, sellerId all are required."));
    }

    try {
        const address = {
            houseNo, streetNo, locality, landmark, city, state, pinCode,
        };
        const addressSchema = new AddressSchema(address);
        const response = await SellerSchema.updateOne({ _id: sellerId }, { $push: { homeAddress: addressSchema } });
        return res.status(200).send(apiResponse(response, "Address is successfully added."));
    } catch (err) {
        return res.status(500).send(apiResponse(err, "Some error came up."));
    }
});

module.exports = router;

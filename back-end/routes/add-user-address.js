const express = require("express");

const router = express.Router();
const apiResponse = require("../utils/api-response");
const validateSellerToken = require("../middlewares/validate-seller-token");
const AddressSchema = require("../models/address");
const UserSchema = require("../models/user");

router.post("/:id", validateSellerToken, async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).send(apiResponse(null, "UserId is required"));
    }
    const {
        unitNumber, streetNo, locality, landmark, city, state, pinCode, country,
    } = req.body;
    if (!unitNumber || !city || !state || !pinCode || !country) {
        return res.status(400).send(apiResponse(null, "unitNumber, locality, city, state, pinCode, country all are required."));
    }

    try {
        const address = {
            unitNumber, streetNo, locality, landmark, city, state, pinCode, country,
        };
        const addressSchema = await AddressSchema.create(address);
        const response = await UserSchema.updateOne({ _id: userId }, { $push: { address: addressSchema } });
        return res.status(200).send(apiResponse(response, "Address is successfully added."));
    } catch (err) {
        return res.status(500).send(apiResponse(err, "Some error came up."));
    }
});

module.exports = router;

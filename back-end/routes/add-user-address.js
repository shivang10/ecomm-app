const express = require("express");
const router = express.Router();
const apiResponse = require("../utils/api-response");
const validateSellerToken = require("../middlewares/validate-seller-token");
const AddressSchema = require("../models/address");
const UserSchema = require("../models/user");

router.post("/:id", validateSellerToken, async (req, res) => {
    const userId = req.params.id;
    const {houseNo, streetNo, locality, landmark, city, state, pinCode} = req.body;
    if (!houseNo || !userId || !locality || !city || !state || !pinCode) {
        return res.status(400).send(apiResponse(null, "houseNo, locality, city, state, pinCode, userId all are required."));
    }

    try {
        const address = {
            houseNo, streetNo, locality, landmark, city, state, pinCode
        }
        const addressSchema = new AddressSchema(address)
        const response = await UserSchema.updateOne({_id: userId}, {$push: {address: addressSchema}})
        return res.status(200).send(apiResponse(response, "Address is successfully added."))
    } catch (err) {
        return res.status(500).send(apiResponse(err, "Some error came up."))
    }
})

module.exports = router;
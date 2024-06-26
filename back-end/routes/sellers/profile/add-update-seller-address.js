const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateSellerToken = require("../../../middlewares/validate-seller-token");
const AddressSchema = require("../../../models/address");
const SellerSchema = require("../../../models/seller");
const generateObjectId = require("../../../utils/generate-object-id");

router.post("/:id", validateSellerToken, async (req, res) => {
    const sellerId = generateObjectId(req.params.id);
    const {
        unitNumber, streetNo, locality, landmark, city, state, pinCode, country,
    } = req.body;
    if (!unitNumber || !locality || !city || !state || !pinCode || !country) {
        return res.status(400).send(apiResponse(null, "unitNumber, locality, city, state, pinCode, country all are required."));
    }

    try {
        const address = {
            unitNumber, streetNo, locality, landmark, city, state, pinCode, country,
        };
        const addressSchema = new AddressSchema(address);
        const response = await SellerSchema.updateOne({ _id: sellerId }, { homeAddress: addressSchema });
        return res.status(200).send(apiResponse(response, "Address is successfully added."));
    } catch (err) {
        return res.status(500).send(apiResponse(err, "Some error came up."));
    }
});

module.exports = router;

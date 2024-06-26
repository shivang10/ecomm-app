const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const AddressSchema = require("../../../models/address");
const UserSchema = require("../../../models/user");
const generateObjectId = require("../../../utils/generate-object-id");
const validateUserToken = require("../../../middlewares/validate-user-token");

router.post("/:id", validateUserToken, async (req, res) => {
    const userId = generateObjectId(req.params.id);
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
        const addressSchema = new AddressSchema(address);
        const response = await UserSchema.updateOne({ _id: userId }, { $push: { address: addressSchema } });
        return res.status(200).send(apiResponse(response, "Address is successfully added."));
    } catch (err) {
        return res.status(500).send(apiResponse(err, "Some error came up."));
    }
});

module.exports = router;

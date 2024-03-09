const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const UserSchema = require("../../../models/user");
const generateObjectId = require("../../../utils/generate-object-id");

router.post("/:id/:addressId", validateUserToken, async (req, res) => {
    const userId = generateObjectId(req.params.id);
    const addressId = generateObjectId(req.params.addressId);

    if (!userId) {
        return res.status(400).send(apiResponse(null, "UserId is required"));
    }

    if (!addressId) {
        return res.status(400).send(apiResponse(null, "AddressId is required"));
    }

    try {
        const updatedAddressDetails = req.body;
        const updateQuery = { _id: userId, "address._id": addressId };
        const setQuery = { $set: {} };
        Object.keys(updatedAddressDetails).forEach((addressKey) => {
            setQuery.$set[`address.$.${addressKey}`] = updatedAddressDetails[addressKey];
        });
        await UserSchema.updateOne(
            updateQuery,
            setQuery,
        );
        const pipeline = [
            { $match: { _id: userId } },
            { $unwind: "$address" },
            { $match: { "address._id": addressId } },
            { $project: { address: "$address" } },
        ];
        const userDetails = await UserSchema.aggregate(pipeline);
        return res.status(200).send(apiResponse(userDetails, "Your address has been successfully updated."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to find user details"));
    }
});

module.exports = router;

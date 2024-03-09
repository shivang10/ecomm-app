const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const UserSchema = require("../../../models/user");
const generateObjectId = require("../../../utils/generate-object-id");

router.delete("/:id/:aid", validateUserToken, async (req, res) => {
    const userId = generateObjectId(req.params.id);
    const addressId = generateObjectId(req.params.aid);

    try {
        const updateQuery = { _id: userId };
        const deleteQuery = { $pull: { address: { _id: addressId } } };
        const result = await UserSchema.updateOne(updateQuery, deleteQuery);

        if (result.modifiedCount === 0) {
            return res.status(500).send(apiResponse(null, "Unable to find the address"));
        }

        return res.status(200).send(apiResponse(result, "Address is successfully deleted."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to delete the address"));
    }
});

module.exports = router;

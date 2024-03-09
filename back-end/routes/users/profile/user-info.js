const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const UserSchema = require("../../../models/user");
const generateObjectId = require("../../../utils/generate-object-id");

router.get("/:id", validateUserToken, async (req, res) => {
    const userId = generateObjectId(req.params.id);
    try {
        const userDetails = await UserSchema.findById({ _id: userId }, { password: 0, address: 0, payment: 0 });
        if (!userDetails) {
            return res.status(400).send(apiResponse(null, "No such user exists"));
        }
        return res.status(200).send(apiResponse(userDetails, "User details are successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to find user details"));
    }
});

module.exports = router;

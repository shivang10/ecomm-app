const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const UserSchema = require("../../../models/user");

router.get("/:id", validateUserToken, async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).send(apiResponse(null, "UserId is required"));
    }

    try {
        const userDetails = await UserSchema.findById({ _id: userId }, { address: 1, email: 1 });

        if (!userDetails) {
            return res.status(400).send(apiResponse(null, "No such user exists"));
        }
        return res.status(200).send(apiResponse(userDetails, "User addresses are successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to find user details"));
    }
});

module.exports = router;

const express = require("express");

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../../../models/user");
const apiResponse = require("../../../utils/api-response");
const validateUserToken = require("../../../middlewares/validate-user-token");
const generateObjectId = require("../../../utils/generate-object-id");

dotenv.config();

const { JWT_SECRET } = process.env;
const saltRounds = 10;

router.post("/:id", validateUserToken, async (req, res) => {
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
        return res.status(400).send(apiResponse(null, "Email and password both are required."));
    }
    const id = generateObjectId(req.params.id);

    try {
        const isUserValid = await User.findOne({ _id: id }, { username: 1, password: 1, email: 1 });
        const isPasswordCorrect = await bcrypt.compare(password, isUserValid.password);
        if (isPasswordCorrect) {
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            await User.findByIdAndUpdate(
                { _id: id },
                { $set: { password: hashedPassword } },
            );
            const getUserDetails = await User.findOne({ _id: id }, { username: 1, email: 1 });
            const token = jwt.sign({
                // eslint-disable-next-line no-underscore-dangle
                id: getUserDetails._id,
                username: getUserDetails.username,
                email: getUserDetails.email,
                type: "user",
            }, JWT_SECRET, {
                expiresIn: "7d",
            });
            return res.status(200).send(apiResponse({ token }, "Your password is successfully changed."));
        }
        return res.status(400).send(apiResponse(null, "Something went wrong. Try Again"));
    } catch (err) {
        return res.status(500).send(apiResponse(null, "Something went wrong. Try Again"));
    }
});

module.exports = router;

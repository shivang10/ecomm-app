const router = require("express").Router();
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const User = require("../../../models/user");

const saltRounds = 10;
const apiResponse = require("../../../utils/api-response");

router.route("/").post(async (req, res) => {
    const {
        username, password: plainTextPassword, email, phoneNumber,
    } = req.body;

    if (!email || !plainTextPassword || !username || !phoneNumber) {
        return res.status(400).send(apiResponse(null, "Email,password, username and phoneNumber, all fields are required."));
    }

    if (!emailValidator.validate(email)) {
        return res.status(400).send(apiResponse(null, "Incorrect email."));
    }

    const password = await bcrypt.hash(plainTextPassword, saltRounds);

    try {
        const response = await User.create({
            username, password, email, phoneNumber,
        });
        return res.status(200).send(apiResponse(response, "Account is successfully created."));
    } catch (err) {
        return res.status(500).send(apiResponse(err, "Some error came up."));
    }
});

module.exports = router;

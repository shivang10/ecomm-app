const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const apiResponse = require("../utils/api-response");

router.route("/").post(async (req, res) => {
    const {username, password: plainTextPassword, email, phoneNumber} = req.body;
    const password = await bcrypt.hash(plainTextPassword, saltRounds);

    try {
        const response = await User.create({
            username, password, email, phoneNumber
        });
        return res.status(200).send(apiResponse(response, "Successfully registered."))
    } catch (err) {
        return res.status(400).send(apiResponse(err, "Some error came up."))
    }

});

module.exports = router;
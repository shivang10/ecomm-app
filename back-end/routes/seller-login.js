const express = require("express");
const router = express.Router();
const Seller = require("../models/seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const apiResponse = require("../utils/api-response");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).send(apiResponse(null, "Email and password both are required."));
    }

    try {
        const isSellerUserValid = await Seller.findOne({email}, {username: 1, password: 1, email: 1});
        const isPasswordCorrect = await bcrypt.compare(password, isSellerUserValid["password"]);
        if (isPasswordCorrect) {
            const token = jwt.sign({
                id: isSellerUserValid._id,
                username: isSellerUserValid.username,
                email: email,
                type: "seller"
            }, JWT_SECRET, {
                expiresIn: "7d"
            });
            return res.status(200).send(apiResponse({token}, "Successfully logged in"));
        } else {
            return res.status(400).send(apiResponse(null, "Wrong email or password. Try Again"));
        }
    } catch (err) {
        return res.status(500).send(apiResponse(null, "Wrong email or password. Try Again"));
    }
});

module.exports = router;

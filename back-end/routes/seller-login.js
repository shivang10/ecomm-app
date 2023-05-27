const express = require("express");
const router = express.Router();
const Seller = require("../models/seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const api_response = require("../utils/api-response");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).send(api_response(null, "Email and password both are required."));
    }

    try {
        const isSellerUserValid = await Seller.findOne({email}, {username: 1, password: 1, email: 1});
        const isPasswordCorrect = await bcrypt.compare(password, isSellerUserValid["password"]);
        if (isPasswordCorrect) {
            const token = jwt.sign({id: isSellerUserValid._id, username: isSellerUserValid.username}, JWT_SECRET, {
                expiresIn: "7d"
            });
            return res.status(200).send(api_response({token}, "Successfully logged in"));
        } else {
            return res.status(400).send(api_response(null, "Wrong email or password. Try Again"));
        }
    } catch (err) {
        return res.status(400).send(api_response(null, "Wrong email or password. Try Again"));
    }
});

module.exports = router;

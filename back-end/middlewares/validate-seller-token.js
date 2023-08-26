const jwt = require("jsonwebtoken");
const Seller = require("../models/seller");

const { JWT_SECRET } = process.env;
const apiResponse = require("../utils/api-response");

const verifySellerToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).send(apiResponse(null, "Access denied!"));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(400).send(apiResponse(null, "Token not present"));
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).send(apiResponse(null, "Invalid Token"));
        }
        const { username } = decoded;
        const isSellerValid = await Seller.findOne({ username }, { email: 1 });

        if (!isSellerValid) {
            return res.status(400).send(apiResponse(null, "You don't have permission to access this"));
        }
        next();
        return null;
    });
    return null;
};
module.exports = verifySellerToken;

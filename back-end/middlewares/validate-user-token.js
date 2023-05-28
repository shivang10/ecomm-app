const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;
const apiResponse = require("../utils/api-response");

const verifyUserToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(400).send(apiResponse(null, "Access denied!"));
    }
    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.sendStatus(400).send(apiResponse(null, "Token not present"));
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).send(apiResponse(null, "Token invalid"));
        } else {
            const username = decoded.username;
            const isUserValid = await User.findOne({username}, {email: 1});
            if (!isUserValid) {
                return res.status(400).send(apiResponse(null, "You don't have permission to access this"));
            }
            req.user = decoded
            next();
        }
    })
}
module.exports = verifyUserToken;

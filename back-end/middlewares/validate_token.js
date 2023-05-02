const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = process.env.JWTSECRET;
const api_response = require("../utils/api-response");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(400).send(api_response(null, "Access denied!"));
    }
    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.sendStatus(400).send(api_response(null, "Token not present"));
    }

    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).send(api_response(null, "Token invalid"));
        } else {
            const username = decoded.username;
            const isUserValid = await User.findOne({username}, {email: 1});
            if (!isUserValid) {
                return res.status(400).send(api_response(null, "You don't have permission to access this"));
            }
            req.user = decoded
            next();
        }
    })
}
module.exports = verifyToken;

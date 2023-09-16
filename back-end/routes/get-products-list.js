const express = require("express");

const router = express.Router();
const apiResponse = require("../utils/api-response");
const ProductSchema = require("../models/products");

router.get("/", async (req, res) => {
    const maxProductsAllowedToBeFetched = 100;
    const limit = Math.min(req.query.limit, maxProductsAllowedToBeFetched) || 10;
    const page = req.query.page || 1;
    try {
        const productsList = await ProductSchema.find().skip(page).limit(limit);
        return res.status(200).send(apiResponse(productsList, "Products are successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to fetch products. Please try after sometime."));
    }
});

module.exports = router;

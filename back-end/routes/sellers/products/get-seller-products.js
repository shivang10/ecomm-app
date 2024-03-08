const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateSellerToken = require("../../../middlewares/validate-seller-token");
const ProductsSchema = require("../../../models/products");

router.get("/:id", validateSellerToken, async (req, res) => {
    const sellerId = req.params.id;

    if (!sellerId) {
        return res.status(400).send(apiResponse(null, "SellerId is required"));
    }

    try {
        const maxProductsAllowedToBeFetched = 50;
        const limit = Math.min(req.query.limit, maxProductsAllowedToBeFetched) || 10;
        const page = req.query.page || 1;
        const productsList = await ProductsSchema.find({ sellerId }).skip(page).limit(limit);
        return res.status(200).send(apiResponse(productsList, "Products are successfully fetched."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to fetch seller products."));
    }
});

module.exports = router;

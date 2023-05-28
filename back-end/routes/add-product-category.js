const express = require("express");
const router = express.Router();
const CategorySchema = require("../models/product-categories");
const apiResponse = require("../utils/api-response");
const validateSellerToken = require("../middlewares/validate-seller-token");

router.post("/", validateSellerToken, async (req, res) => {
    const {category} = req.body;

    if (!category) {
        return res.status(400).send(apiResponse(null, "Category is required."));
    }

    try {
        const productCategory = {category};
        const response = await CategorySchema.create(productCategory);
        return res.status(200).send(apiResponse(response, "Category is successfully created."))
    } catch (err) {
        return res.status(400).send(apiResponse(err, "Some error came up."))
    }
});

module.exports = router;
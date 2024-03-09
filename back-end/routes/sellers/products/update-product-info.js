const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateSellerToken = require("../../../middlewares/validate-seller-token");
const ProductSchema = require("../../../models/products");
const generateObjectId = require("../../../utils/generate-object-id");

router.put("/:id/:pid", validateSellerToken, async (req, res) => {
    const productId = generateObjectId(req.params.pid);
    const fieldsToExclude = ["variation", "_id", "sellerId"];

    if (!req.body) {
        return res.status(400).send(apiResponse(null, "Fields value are required."));
    }

    try {
        const updatedProductDetails = req.body;
        const setProductQuery = { $set: {} };

        Object.keys(updatedProductDetails).forEach((productKey) => {
            if (!fieldsToExclude.includes(productKey)) {
                setProductQuery.$set[productKey] = updatedProductDetails[productKey];
            }
        });

        await ProductSchema.updateOne({ _id: productId }, setProductQuery);

        const updatedVariationDetails = req.body.variation;

        if (updatedVariationDetails && updatedVariationDetails.length > 0) {
            await Promise.all(updatedVariationDetails.map(async (variation) => {
                const setVariationQuery = { $set: {} };
                const variationId = generateObjectId(variation._id);
                const updateQuery = { _id: productId, "variation._id": variationId };
                Object.keys(variation).forEach((varKey) => {
                    setVariationQuery.$set[`variation.$.${varKey}`] = variation[varKey];
                });
                await ProductSchema.updateOne(updateQuery, setVariationQuery);
            }));
        }

        const productDetails = await ProductSchema.findById(productId);
        return res.status(200).send(apiResponse(productDetails, "Product is successfully added"));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to add product"));
    }
});

module.exports = router;

const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateSellerToken = require("../../../middlewares/validate-seller-token");
const ProductSchema = require("../../../models/products");
const generateObjectId = require("../../../utils/generate-object-id");
const VariationSchema = require("../../../models/product-variation");

router.put("/:id/:pid", validateSellerToken, async (req, res) => {
    const productId = generateObjectId(req.params.pid);

    if (!req.body) {
        return res.status(400).send(apiResponse(null, "Fields value are required."));
    }

    try {
        const newVariations = req.body.variation;
        const productVariations = newVariations.map((pv) => new VariationSchema({
            property: pv.property, price: pv.price, quantity: pv.quantity,
        }));
        const setProductQuery = {
            $push: { variation: { $each: productVariations } },
        };

        await ProductSchema.updateOne({ _id: productId }, setProductQuery);

        const productDetails = await ProductSchema.findById(productId);
        return res.status(200).send(apiResponse(productDetails, "Variation is successfully added."));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to add product variation."));
    }
});

module.exports = router;

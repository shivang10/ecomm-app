const express = require("express");

const router = express.Router();
const apiResponse = require("../../../utils/api-response");
const validateSellerToken = require("../../../middlewares/validate-seller-token");
const SellerSchema = require("../../../models/seller");
const VariationSchema = require("../../../models/product-variation");
const ProductSchema = require("../../../models/products");
const StoreSchema = require("../../../models/store");

router.post("/:id", validateSellerToken, async (req, res) => {
    const sellerId = req.params.id;
    const {
        name, tags, variation, description, storeId,
    } = req.body;

    if (!name || !sellerId || !tags || !variation || !description) {
        return res.status(400).send(apiResponse(null, "Every field: name, sellerId, tags, variation, description are required."));
    }

    try {
        const isSellerValid = await SellerSchema.findById({ _id: sellerId }, { email: 1 });

        if (!isSellerValid) {
            return res.status(400).send(apiResponse(null, "No such seller exists"));
        }

        const productVariations = variation.map((pv) => new VariationSchema({
            property: pv.property, price: pv.price, quantity: pv.quantity,
        }));

        const product = {
            name, sellerId, tags, variation: productVariations, description,
        };

        const response = await ProductSchema.create(product);
        // eslint-disable-next-line no-underscore-dangle
        const productId = (response._id).valueOf();

        await StoreSchema.updateOne({ _id: storeId }, { $push: { products: productId } });

        return res.status(200).send(apiResponse(response, "Product is successfully added"));
    } catch (error) {
        return res.status(500).send(apiResponse(error, "Unable to add product"));
    }
});

module.exports = router;

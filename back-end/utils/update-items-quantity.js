/* eslint-disable no-underscore-dangle */
const ProductsSchema = require("../models/products");

const updateItemsQuantity = async (items = [], shouldDecreaseQty = true) => {
    const updateProductsQty = items.map((item) => ({
        updateOne: {
            filter: { _id: item.productId, "variation._id": item.productVariationId },
            update: { $inc: { "variation.$.quantity": shouldDecreaseQty ? -item.quantity : item.quantity } },
        },
    }));
    await ProductsSchema.bulkWrite(updateProductsQty);
};

module.exports = updateItemsQuantity;

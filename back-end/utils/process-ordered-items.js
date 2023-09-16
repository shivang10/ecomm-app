const orderStatusEnums = require("./order-status-enums");

const processOrderedItems = (items) => {
    const finalItems = items.map((item) => {
        const {
            productId, productVariationId, productDiscount, quantity, price, sellerId,
        } = item;
        const priceBeforeDiscount = price * quantity;
        const priceAfterDiscount = priceBeforeDiscount - productDiscount;
        const orderStatus = orderStatusEnums.placed;

        return {
            price,
            quantity,
            productId,
            productDiscount,
            priceAfterDiscount,
            priceBeforeDiscount,
            productVariationId,
            orderStatus,
            sellerId,
        };
    });
    return finalItems;
};

module.exports = processOrderedItems;

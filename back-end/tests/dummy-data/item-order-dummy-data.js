const orderStatusEnums = require("../../utils/order-status-enums");

const itemOrderPrice = 100;
const itemOrderQuantity = 1;
const itemOrderTotalPrice = 100;
const itemOrderProductId = "p1";
const itemOrderDiscount = 0;
const itemOrderPriceWrong = -1;
const itemOrderQuantityWrong = 0;
const itemOrderDiscountWrong = -1;
const itemOrderTotalPriceWrong = -1;
const itemOrderSellerId = "sellerId";
const itemOrderStatus = orderStatusEnums.placed;
const itemOrderPriceAfterDiscount = 100;

module.exports = {
    itemOrderDiscountWrong,
    itemOrderDiscount,
    itemOrderPrice,
    itemOrderPriceWrong,
    itemOrderTotalPrice,
    itemOrderQuantity,
    itemOrderQuantityWrong,
    itemOrderProductId,
    itemOrderTotalPriceWrong,
    itemOrderSellerId,
    itemOrderStatus,
    itemOrderPriceAfterDiscount,
};

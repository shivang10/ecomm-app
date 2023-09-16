const mongoose = require("mongoose");

const OrderStatus = new mongoose.Schema({
    orderId: { type: String, required: true },
    orderStatus: {
        type: String,
        required: true,
        enum: ["placed", "packed", "shipped", "out for delivery", "delivered", "cancelled", "returned"],
    },
});

const model = mongoose.model("OrderStatus", OrderStatus);

module.exports = model;

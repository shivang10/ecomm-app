const mongoose = require("mongoose");
const AddressSchema = require("./address");

const Store = new mongoose.Schema({
    name: { type: String, required: true },
    sellerId: { type: String, required: true },
    address: { type: AddressSchema.schema, required: false },
    products: { type: Array, required: false },
});

const model = mongoose.model("Store", Store);

module.exports = model;

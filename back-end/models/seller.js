const mongoose = require("mongoose");
const AddressSchema = require("./address");

const Seller = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, required: true, unique: true},
    homeAddress: {type: [AddressSchema.schema], required: false},
    storesId: {type: [String], required: false},
    ordersReceived: {type: Array, required: false}
});

const model = mongoose.model("Seller", Seller);

module.exports = model;

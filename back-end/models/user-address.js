const mongoose = require("mongoose");

const UserAddress = new mongoose.Schema({
    unitNumber: {type: String, required: true},
    streetNumber: {type: String, required: false},
    addressLine1: {type: String, required: true},
    addressLine2: {type: String, required: false},
    city: {type: String, required: true},
    state: {type: String, required: true},
    postalCode: {type: Number, required: true},
    country: {type: String, required: true}
})

const model = mongoose.model("UserAddress", UserAddress);

module.exports = model;

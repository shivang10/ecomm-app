const mongoose = require("mongoose");

const Address = new mongoose.Schema({
    unitNumber: { type: String, required: true },
    streetNo: { type: String, required: false },
    locality: { type: String, required: false },
    landmark: { type: String, required: false },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    country: { type: String, required: true },
});

const model = mongoose.model("Address", Address);
module.exports = model;

const mongoose = require("mongoose");
const AddressSchema = require("./address");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: [AddressSchema.schema], required: false },
    payment: { type: [String], required: false },
});

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;

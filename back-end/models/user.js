const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    address: {type: Array, required: false}
});

const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;

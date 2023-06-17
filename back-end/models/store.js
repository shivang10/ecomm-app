const mongoose = require("mongoose");

const Store = new mongoose.Schema({
    name: {type: String, required: true},
    sellerId: {type: String, required: true},
    address: {type: String, required: true},
    products: {type: Array, required: false}
})

const model = mongoose.model("Store", Store);

module.exports = model;

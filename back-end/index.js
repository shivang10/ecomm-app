const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const userRegister = require("./routes/user-register");
app.use("/user-register", userRegister);

const userLogin = require("./routes/user-login");
app.use("/user-login", userLogin);

const sellerRegister = require("./routes/seller-register");
app.use("/seller-register", sellerRegister);

const sellerLogin = require("./routes/seller-login");
app.use("/seller-login", sellerLogin);

const addProduct = require("./routes/add-new-product");
app.use("/add-product", addProduct);

const addProductCategory = require("./routes/add-product-category");
app.use("/add-product-category", addProductCategory);

module.exports = app;
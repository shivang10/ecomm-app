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

const getSellerInfo = require("./routes/seller-info");

app.use("/seller/info/", getSellerInfo);

const getSellerAddress = require("./routes/seller-address");

app.use("/seller/address/", getSellerAddress);

const addStore = require("./routes/add-store");

app.use("/add-store", addStore);

const addSellerAddress = require("./routes/add-update-seller-address");

app.use("/add-seller-address", addSellerAddress);

const addUserAddress = require("./routes/add-user-address");

app.use("/add-user-address", addUserAddress);

const getUserInfo = require("./routes/user-info");

app.use("/user/info", getUserInfo);

const getUserAddresses = require("./routes/user-address");

app.use("/user/address/", getUserAddresses);

const newOrder = require("./routes/new-order");

app.use("/order", newOrder);

const newOrderPayment = require("./routes/new-order-payment");

app.use("/payment", newOrderPayment);

const getProductsList = require("./routes/get-products-list");

app.use("/products", getProductsList);

const getUserPaymentMethods = require("./routes/get-user-payment-methods");

app.use("/payment-methods", getUserPaymentMethods);

const getUserOrders = require("./routes/get-user-orders");

app.use("/user-orders", getUserOrders);

const getSellerProducts = require("./routes/get-seller-products");

app.use("/seller-products", getSellerProducts);

module.exports = app;

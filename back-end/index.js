const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const userRegister = require("./routes/users/auth/user-register");

app.use("/user-register", userRegister);

const userLogin = require("./routes/users/auth/user-login");

app.use("/user-login", userLogin);

const sellerRegister = require("./routes/sellers/auth/seller-register");

app.use("/seller-register", sellerRegister);

const sellerLogin = require("./routes/sellers/auth/seller-login");

app.use("/seller-login", sellerLogin);

const addProduct = require("./routes/sellers/products/add-new-product");

app.use("/add-product", addProduct);

const addProductCategory = require("./routes/sellers/products/add-product-category");

app.use("/add-product-category", addProductCategory);

const getSellerInfo = require("./routes/sellers/profile/seller-info");

app.use("/seller/info/", getSellerInfo);

const getSellerAddress = require("./routes/sellers/profile/seller-address");

app.use("/seller/address/", getSellerAddress);

const addStore = require("./routes/sellers/store/add-store");

app.use("/add-store", addStore);

const addSellerAddress = require("./routes/sellers/profile/add-update-seller-address");

app.use("/add-seller-address", addSellerAddress);

const addUserAddress = require("./routes/users/profile/add-user-address");

app.use("/add-user-address", addUserAddress);

const getUserInfo = require("./routes/users/profile/user-info");

app.use("/user/info", getUserInfo);

const getUserAddresses = require("./routes/users/profile/user-address");

app.use("/user/address/", getUserAddresses);

const newOrder = require("./routes/users/orders/new-order");

app.use("/order", newOrder);

const newOrderPayment = require("./routes/users/payment-methods/new-order-payment");

app.use("/payment", newOrderPayment);

const getProductsList = require("./routes/common/get-products-list");

app.use("/products", getProductsList);

const getUserPaymentMethods = require("./routes/users/payment-methods/get-user-payment-methods");

app.use("/payment-methods", getUserPaymentMethods);

const getUserOrders = require("./routes/users/orders/get-user-orders");

app.use("/user-orders", getUserOrders);

const getSellerProducts = require("./routes/sellers/products/get-seller-products");

app.use("/seller-products", getSellerProducts);

module.exports = app;

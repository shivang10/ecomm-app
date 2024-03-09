const MainRouter = require("express").Router();

MainRouter.use("/add-product", require("./add-new-product"));
MainRouter.use("/add-product-category", require("./add-product-category"));
MainRouter.use("/get-products", require("./get-seller-products"));

module.exports = MainRouter;

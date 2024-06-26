const MainRouter = require("express").Router();

MainRouter.use("/get-orders", require("./get-user-orders"));
MainRouter.use("/new-order", require("./new-order"));
MainRouter.use("/order-info", require("./get-single-order-info"));
MainRouter.use("/cancel-order-item", require("./cancel-single-order-item"));
MainRouter.use("/cancel-whole-order", require("./cancel-whole-order"));
MainRouter.use("/add-product-review", require("./add-product-review"));
MainRouter.use("/update-product-review", require("./update-product-review"));

module.exports = MainRouter;

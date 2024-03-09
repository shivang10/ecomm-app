const MainRouter = require("express").Router();

MainRouter.use("/get-all-orders", require("./get-all-orders"));
MainRouter.use("/order-info", require("./get-single-order-info"));
MainRouter.use("/update-order-info", require("./update-order-status"));

module.exports = MainRouter;

const MainRouter = require("express").Router();

MainRouter.use("/get-all-orders", require("./get-all-orders"));
MainRouter.use("/order-info", require("./get-single-order-info"));

module.exports = MainRouter;

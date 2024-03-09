const MainRouter = require("express").Router();

MainRouter.use("/get-orders", require("./get-user-orders"));
MainRouter.use("/new-order", require("./new-order"));
MainRouter.use("/order-info", require("./get-single-order-info"));

module.exports = MainRouter;

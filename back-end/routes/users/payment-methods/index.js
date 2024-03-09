const MainRouter = require("express").Router();

MainRouter.use("/payment-methods", require("./get-user-payment-methods"));
MainRouter.use("/new-order-payment", require("./new-order-payment"));

module.exports = MainRouter;

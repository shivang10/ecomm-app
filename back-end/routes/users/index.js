const MainRouter = require("express").Router();

MainRouter.use("/auth", require("./auth"));
MainRouter.use("/profile", require("./profile"));
MainRouter.use("/orders", require("./orders"));
MainRouter.use("/payment", require("./payment-methods"));

module.exports = MainRouter;

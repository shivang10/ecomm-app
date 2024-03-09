const MainRouter = require("express").Router();

MainRouter.use("/auth", require("./auth"));
MainRouter.use("/products", require("./products"));
MainRouter.use("/profile", require("./profile"));
MainRouter.use("/store", require("./store"));
MainRouter.use("/orders", require("./orders"));

module.exports = MainRouter;

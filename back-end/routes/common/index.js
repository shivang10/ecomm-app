const MainRouter = require("express").Router();

MainRouter.use("/get-products-list", require("./get-products-list"));

module.exports = MainRouter;

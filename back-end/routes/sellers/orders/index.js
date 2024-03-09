const MainRouter = require("express").Router();

MainRouter.use("/get-all-orders", require("./get-all-orders"));

module.exports = MainRouter;

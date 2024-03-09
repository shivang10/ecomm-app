const MainRouter = require("express").Router();

MainRouter.use("/add-store", require("./add-store"));

module.exports = MainRouter;

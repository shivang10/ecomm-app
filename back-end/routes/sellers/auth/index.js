const MainRouter = require("express").Router();

MainRouter.use("/login", require("./seller-login"));
MainRouter.use("/register", require("./seller-register"));

module.exports = MainRouter;

const MainRouter = require("express").Router();

MainRouter.use("/login", require("./user-login"));
MainRouter.use("/register", require("./user-register"));

module.exports = MainRouter;

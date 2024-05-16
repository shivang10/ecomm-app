const MainRouter = require("express").Router();

MainRouter.use("/login", require("./user-login"));
MainRouter.use("/register", require("./user-register"));
MainRouter.use("/change-password", require("./user-change-password"));

module.exports = MainRouter;

const MainRouter = require("express").Router();

MainRouter.use("/add-address", require("./add-user-address"));
MainRouter.use("/update-address", require("./update-user-address"));
MainRouter.use("/get-address", require("./user-address"));
MainRouter.use("/info", require("./user-info"));

module.exports = MainRouter;

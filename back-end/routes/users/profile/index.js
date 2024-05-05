const MainRouter = require("express").Router();

MainRouter.use("/add-address", require("./add-user-address"));
MainRouter.use("/update-address", require("./update-user-address"));
MainRouter.use("/get-address", require("./user-address"));
MainRouter.use("/info", require("./user-info"));
MainRouter.use("/delete-address", require("./delete-address"));
MainRouter.use("/get-address-info", require("./get-address-info"));

module.exports = MainRouter;

const MainRouter = require("express").Router();

MainRouter.use("/address", require("./seller-address"));
MainRouter.use("/info", require("./seller-info"));
MainRouter.use("/add-update-address", require("./add-update-seller-address"));

module.exports = MainRouter;

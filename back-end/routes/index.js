module.exports = function (app) {
    app.use("/user", require("./users"));
    app.use("/seller", require("./sellers"));
    app.use("/", require("./common"));
};

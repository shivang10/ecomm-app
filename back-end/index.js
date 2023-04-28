const express = require("express");

const app = express();

app.use(express.json());

const userRegister = require("./routes/user-register");
app.use("/user-register", userRegister);

const userLogin = require("./routes/user-login");
app.use("/user-login", userLogin);

module.exports = app;
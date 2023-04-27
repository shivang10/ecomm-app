const express = require("express");

const app = express();

app.use(express.json());

const userRegister = require("./routes/user-register");
app.use("/register", userRegister);

module.exports = app;
require("./db/db-connect");
const app = require("./index");

app.listen(5000, () => {
    console.log("server is running")
});
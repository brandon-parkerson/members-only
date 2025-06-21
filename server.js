const express = require("express");
const app = express();
// routes
const usersRouter = require("./routes/users");

app.use("/users", express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use("/", usersRouter);

app.listen(3000);

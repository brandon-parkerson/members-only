const express = require("express");
const app = express();

// routes
const usersRouter = require("./routes/users");


app.set("view engine", "ejs");
// serve static files like css
app.use(express.static("public"));


app.use("/", usersRouter);
app.use("/register", usersRouter);

app.listen(3000);

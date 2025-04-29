const path = require("node:path");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({secret: "osmo", resave: false, saveUninitialized: false}));
app.use(passport.session());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(3000, () => console.log("app listening on port 3000"));
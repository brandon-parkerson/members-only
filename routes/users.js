const express = require("express");
const router = express.Router();
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res, next) => {
  try {
    const firsName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const password = hashedPassword;
    const membershipStatus = "yes";
    db.insertUser(firsName, lastName, email, password, membershipStatus);
    console.log(firsName, lastName, email, password, membershipStatus);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;

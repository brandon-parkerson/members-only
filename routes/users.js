const express = require("express");
const router = express.Router();
const db = require("../db/queries");

router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const firsName = req.body.first;
  const lastName = req.body.last;
  const email = req.body.email;
  const password = req.body.password;
  const membershipStatus = "yes";
  db.insertUser(firsName, lastName, email, password, membershipStatus);
  console.log(firsName, lastName, email, password, membershipStatus);
  res.redirect("/");
});
module.exports = router;

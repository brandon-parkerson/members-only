const express = require("express");
const router = express.Router();
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res, next) => {
  try {
    const firsName = req.body.first.trim();
    const lastName = req.body.last.trim();
    const email = req.body.email.trim();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const password = hashedPassword;
    const membershipStatus = "no";
    db.insertUser(firsName, lastName, email, password, membershipStatus);
    console.log(firsName, lastName, email, password, membershipStatus);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
);

router.get("/dashboard", (req, res) => {
  const name = req.user.user_first_name;
  const isMember = req.user.membership_status;

  if (!req.user) {
    res.redirect("/");
  } else {
    res.render("dashboard", { name: name, isMember: isMember });
  }
});

router.get("/membership", (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    res.render("membership", { secret: "" });
  }
});

router.post("/secret", (req, res) => {
  const secret = req.body.secret.trim();
  const id = req.user.user_id;
  const name = req.user.user_first_name;
  if (secret === process.env.SESSION_SECRET) {
    db.makeMember(id);
    res.redirect("/dashboard");
  } else {
    res.render("membership", { secret: "incorrect" });
  }
});

router.get("/log-out", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next;
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;

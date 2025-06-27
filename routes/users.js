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

router.get("/dashboard", async (req, res) => {
  const name = req.user.user_first_name;
  const isMember = req.user.membership_status;
  const messages = await db.getMessages();
  if (!req.user) {
    res.redirect("/");
  } else {
    res.render("dashboard", {
      name: name,
      isMember: isMember,
      messages: messages,
    });
  }
});

// TODO: STYLE MESSAGE POST PAGE

router.get("/membership", (req, res) => {
  const isMember = req.user.membership_status;
  if (!req.user) {
    res.redirect("/");
  } else {
    res.render("membership", { isMember: isMember });
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
    res.redirect("/membership");
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

// TODO: fix wrong password routing bug when user presses "back". style

router.get("/post", (req, res) => {
  res.render("post");
});

router.post("/post", (req, res) => {
  const date = new Date().toDateString();
  const message = req.body.message.trim();
  const firstName = req.user.user_first_name;
  const lastName = req.user.user_last_name;
  const author = firstName + " " + lastName;
  const userId = req.user.user_id;
  db.insertMessage(message, date, author, userId);
  res.redirect("/dashboard");
});

module.exports = router;

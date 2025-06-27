const bcrypt = require("bcryptjs");
const db = require("../db/queries");

exports.renderIndex = (req, res) => {
  res.render("index");
};

exports.renderRegister = (req, res) => {
  res.render("register");
};

exports.registerUser = async (req, res, next) => {
  try {
    const firsName = req.body.first.trim();
    const lastName = req.body.last.trim();
    const email = req.body.email.trim();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const password = hashedPassword;
    const membershipStatus = "no";
    db.insertUser(firsName, lastName, email, password, membershipStatus);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.renderDashboard = async (req, res) => {
  if (!req.user) return res.redirect("/");
  const name = req.user.user_first_name;
  const isMember = req.user.membership_status;
  const messages = await db.getMessages();
  res.render("dashboard", { name, isMember, messages });
};

exports.renderMembership = (req, res) => {
  if (!req.user) return res.redirect("/");
  res.render("membership", { isMember: req.user.membership_status });
};

exports.handleMembershipSecret = (req, res) => {
  const secret = req.body.secret.trim();
  const id = req.user.user_id;
  if (secret === process.env.SESSION_SECRET) {
    db.makeMember(id);
    res.redirect("/dashboard");
  } else {
    res.redirect("/membership");
  }
};

exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

exports.renderPostForm = (req, res) => {
  res.render("post");
};

exports.createPost = (req, res) => {
  const date = new Date().toDateString();
  const message = req.body.message.trim();
  const firstName = req.user.user_first_name;
  const lastName = req.user.user_last_name;
  const author = `${firstName} ${lastName}`;
  const userId = req.user.user_id;
  db.insertMessage(message, date, author, userId);
  res.redirect("/dashboard");
};

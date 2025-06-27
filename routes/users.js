const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");

router.use(express.urlencoded({ extended: true }));

router.get("/", userController.renderIndex);
router.get("/register", userController.renderRegister);
router.post("/register", userController.registerUser);

router.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/"
}));

router.get("/dashboard", userController.renderDashboard);
router.get("/membership", userController.renderMembership);
router.post("/secret", userController.handleMembershipSecret);
router.get("/log-out", userController.logoutUser);

router.get("/post", userController.renderPostForm);
router.post("/post", userController.createPost);

module.exports = router;

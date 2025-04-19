const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, validateUser } = require("../middleware.js");

const userContoller = require("../controllers/users.js");

router.route("/signup")
    .get(userContoller.renderSignupForm)
    .post(validateUser, wrapAsync(userContoller.signup));

router.route("/login")
    .get(userContoller.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userContoller.login);

router.get("/logout", userContoller.logout);

module.exports = router;

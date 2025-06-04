const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware");
const userController = require("../controllers/user.js");

router.route("/signup")
    .get(wrapAsync(userController.signupGet))
    .post(userController.signup);

router.route("/login")
.get(wrapAsync(userController.loginGet))
.post(
    saveRedirectUrl,
    passport.authenticate("local",                           //match username and password from database
    {failureRedirect:"/login",
    failureFlash:true
        }),
userController.login
);

router.get("/logout",userController.logout);

module.exports = router;
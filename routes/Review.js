const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/review.js");

const {auth,isAuthor} = require("../middleware.js");
// review post
router.post("/review",auth,wrapAsync(reviewController.create));

// delete a review
router.delete("/review/:revId",auth,isAuthor,wrapAsync(reviewController.delete));

module.exports = router;
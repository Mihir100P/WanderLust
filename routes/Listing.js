const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {auth,isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload  = multer({storage});

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(auth,upload.single('list[image]'),wrapAsync(listingController.create));

router.get("/search",auth,wrapAsync(listingController.search));

router.get("/show/:id",wrapAsync(listingController.show));

router.get("/new",auth,wrapAsync(listingController.new));

router.get("/edit/:id",auth,isOwner,wrapAsync(listingController.getEdit));

router.put("/:id",auth,isOwner,upload.single('list[image]'), wrapAsync(listingController.edit));

router.delete("/delete/:id",auth,isOwner,wrapAsync(listingController.delete));

module.exports = router;
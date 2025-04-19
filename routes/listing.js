const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing));

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

const trimId = (req, res, next) => {
    req.params.id = req.params.id.trim();
    next();
};

router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .delete(trimId, isLoggedIn, wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm));

module.exports = router;



const express = require("express");
const router = express.Router();
const { getSite, loginUser, logoutUser, authChecker } = require("../controllers/AuthController");

// Registers a new User
router.post("/scrapesite",  getSite );


module.exports = router;
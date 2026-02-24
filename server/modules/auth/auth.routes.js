const express = require("express");
const { registerUser } = require("./auth.controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", require("./auth.controller").loginUser);

module.exports = router;
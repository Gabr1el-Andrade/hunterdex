const express = require("express");
const { registerUser } = require("./auth.controller");
const { list } = require("./auth.controller");
const auth = require("../../middlewares/auth.middleware");


const router = express.Router();
console.log("Métodos disponíveis no controller:", Object.keys('auth.controller'));

router.post("/register", registerUser);
router.post("/login", require("./auth.controller").loginUser);
router.get("/monster/search", require("./auth.controller").list);
//router.get("/favorites", auth, controller.getFavorites);

module.exports = router;
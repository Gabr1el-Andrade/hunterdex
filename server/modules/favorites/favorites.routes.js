const router = require("express").Router();
const ctrl = require("./favorites.controller");

router.get("/", ctrl.listFavorites);
router.post("/:id", ctrl.addFavorite);
router.delete("/:id", ctrl.removeFavorite);

module.exports = router;
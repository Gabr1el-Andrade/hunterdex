const router = require("express").Router();
const ctrl = require("./monster.controller");

router.get("/", ctrl.list);
router.get("/search", ctrl.search);
router.get("/:id", ctrl.byId);

// chama save para inserir/atualizar no banco
router.post("/:id", ctrl.save);

module.exports = router;
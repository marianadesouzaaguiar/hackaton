const express = require("express");
const router = express.Router();
const verificarToken = require("../middleware/authMiddleware");
const { listarAtividades, criarAtividade } = require("../controllers/atividadeController");

router.get("/", verificarToken, listarAtividades);
router.post("/", verificarToken, criarAtividade);

module.exports = router;

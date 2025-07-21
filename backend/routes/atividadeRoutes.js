const express = require("express");
const router = express.Router();
const verificarToken = require("../middleware/authMiddleware");
const {
  listarAtividades,
  criarAtividade,
  buscarAtividade,
  atualizarAtividade,
  excluirAtividade,
} = require("../controllers/atividadeController");

router.get("/", verificarToken, listarAtividades);
router.post("/", verificarToken, criarAtividade);
router.get("/:id", verificarToken, buscarAtividade);
router.put("/:id", verificarToken, atualizarAtividade);
router.delete("/:id", verificarToken, excluirAtividade);

module.exports = router;

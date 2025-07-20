const express = require("express");
const router = express.Router();
const {
  criarAtividade,
  listarAtividades,
  obterAtividadePorId,
  atualizarAtividade,
  deletarAtividade,
} = require("../controllers/atividadeController");

const verificarToken = require("../middlewares/authMiddleware");

router.get("/", verificarToken, listarAtividades);
router.post("/", verificarToken, criarAtividade);
router.get("/:id", verificarToken, obterAtividadePorId);
router.put("/:id", verificarToken, atualizarAtividade);
router.delete("/:id", verificarToken, deletarAtividade);

module.exports = router;

const express = require("express");
const router = express.Router();
const { generateActivity } = require("../controllers/aiController");
const verificarToken = require("../middleware/authMiddleware");

router.post("/gerar", verificarToken, generateActivity);

module.exports = router;

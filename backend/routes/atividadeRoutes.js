const express = require('express');
const { criarAtividade, listarAtividades } = require('../controllers/atividadeController');
const router = express.Router();

router.post('/', criarAtividade);
router.get('/', listarAtividades);

module.exports = router;

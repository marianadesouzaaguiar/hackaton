// backend/routes/iaRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../services/authMiddleware');

router.post('/gerar-atividade', authMiddleware, aiController.generateActivity);

module.exports = router;

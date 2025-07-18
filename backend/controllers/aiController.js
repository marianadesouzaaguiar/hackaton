require('dotenv').config();
const { generateTextWithOpenRouter } = require('../services/openRouterService');

const generateActivity = async (req, res) => {
  try {
    const { tema } = req.body;

    if (!tema) {
      return res.status(400).json({ error: 'Tema é obrigatório.' });
    }

    const prompt = `Crie uma atividade prática, clara e adaptada ao tema: "${tema}", para alunos do ensino fundamental.`;
    const sugestao = await generateTextWithOpenRouter(prompt);

    res.json({ sugestao });
  } catch (err) {
    console.error('Erro ao gerar atividade com IA:', err.message || err);
    res.status(500).json({ error: 'Erro ao gerar atividade com IA.' });
  }
};

module.exports = { generateActivity };

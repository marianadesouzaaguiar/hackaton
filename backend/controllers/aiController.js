// controllers/aiController.js
const { generateTextWithOpenRouter } = require("../services/openRouterService");

const generateActivity = async (req, res) => {
  try {
    const { tema } = req.body;
    if (!tema) {
      return res.status(400).json({ erro: "Tema é obrigatório." });
    }

    const prompt = `Crie uma atividade educativa sobre o tema "${tema}", com título, descrição e duas perguntas para alunos do ensino fundamental.`;
    const sugestao = await generateTextWithOpenRouter(prompt);

    res.json({ sugestao });
  } catch (err) {
    console.error("Erro ao gerar atividade com IA:", err.message || err);
    res.status(500).json({ erro: "Erro ao gerar atividade com IA." });
  }
};

module.exports = { generateActivity }; // ✅ ESSA LINHA

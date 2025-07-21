const { generateTextWithOpenRouter } = require("../services/openRouterService");

exports.generateActivity = async (req, res) => {
  try {
    const { tema } = req.body;

    if (!tema || typeof tema !== "string" || tema.trim() === "") {
      return res.status(400).json({ error: "Tema é obrigatório e deve ser um texto válido." });
    }

    const prompt = `Crie uma atividade com perguntas sobre: "${tema}". A atividade deve ser clara, objetiva e conter perguntas de múltipla escolha e abertas.`;

    const sugestao = await generateTextWithOpenRouter(prompt);

    if (!sugestao) {
      return res.status(500).json({ error: "A IA não retornou nenhuma sugestão." });
    }

    res.json({ sugestao });
  } catch (err) {
    console.error("Erro ao gerar atividade com IA:", err.response?.data || err.message || err);
    res.status(500).json({ error: "Erro ao gerar atividade com IA." });
  }
};

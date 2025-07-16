// backend/controllers/atividadeController.js
const Activity = require('../models/Activity');

exports.criarAtividade = async (req, res) => {
  try {
    const { titulo, descricao, nivelEscolar, materia, objetivo, perguntas } = req.body;

    if (!titulo || !descricao || !nivelEscolar || !materia || !objetivo || !Array.isArray(perguntas) || perguntas.length === 0) {
      return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios e deve haver ao menos uma pergunta.' });
    }

    const novaAtividade = new Activity({
      titulo,
      descricao,
      nivelEscolar,
      materia,
      objetivo,
      perguntas
    });

    await novaAtividade.save();
    res.status(201).json(novaAtividade);
  } catch (erro) {
    res.status(400).json({ mensagem: "Erro ao criar atividade", erro: erro.message });
  }
};

exports.listarAtividades = async (req, res) => {
  try {
    const atividades = await Activity.find();
    res.status(200).json(atividades);
  } catch (erro) {
    res.status(500).json({ mensagem: "Erro ao listar atividades", erro: erro.message });
  }
};

const Activity = require("../models/Activity");

exports.criarAtividade = async (req, res) => {
  try {
    const nova = new Activity(req.body);
    const salva = await nova.save();
    res.status(201).json(salva);
  } catch (err) {
    console.error("Erro ao criar atividade:", err);
    res.status(500).json({ mensagem: "Erro ao criar atividade." });
  }
};

exports.listarAtividades = async (req, res) => {
  try {
    const atividades = await Activity.find();
    res.json(atividades);
  } catch (err) {
    console.error("Erro ao listar atividades:", err);
    res.status(500).json({ mensagem: "Erro ao listar atividades." });
  }
};

const Activity = require("../models/Activity");

// Criar uma nova atividade
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

// Listar todas as atividades
exports.listarAtividades = async (req, res) => {
  try {
    const atividades = await Activity.find();
    res.json(atividades);
  } catch (err) {
    console.error("Erro ao listar atividades:", err);
    res.status(500).json({ mensagem: "Erro ao listar atividades." });
  }
};

// Buscar uma atividade por ID
exports.buscarAtividade = async (req, res) => {
  try {
    const atividade = await Activity.findById(req.params.id);
    if (!atividade) {
      return res.status(404).json({ mensagem: "Atividade não encontrada." });
    }
    res.json(atividade);
  } catch (err) {
    console.error("Erro ao buscar atividade:", err);
    res.status(500).json({ mensagem: "Erro ao buscar atividade." });
  }
};

// Atualizar uma atividade
exports.atualizarAtividade = async (req, res) => {
  try {
    const atualizada = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!atualizada) {
      return res.status(404).json({ mensagem: "Atividade não encontrada." });
    }
    res.json(atualizada);
  } catch (err) {
    console.error("Erro ao atualizar atividade:", err);
    res.status(500).json({ mensagem: "Erro ao atualizar atividade." });
  }
};

// Excluir uma atividade
exports.excluirAtividade = async (req, res) => {
  try {
    const excluida = await Activity.findByIdAndDelete(req.params.id);
    if (!excluida) {
      return res.status(404).json({ mensagem: "Atividade não encontrada." });
    }
    res.json({ mensagem: "Atividade excluída com sucesso." });
  } catch (err) {
    console.error("Erro ao excluir atividade:", err);
    res.status(500).json({ mensagem: "Erro ao excluir atividade." });
  }
};

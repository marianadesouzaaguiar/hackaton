const Activity = require("../models/Activity");

// Criar uma nova atividade
const criarAtividade = async (req, res) => {
  try {
    const novaAtividade = new Activity(req.body);
    const atividadeSalva = await novaAtividade.save();
    res.status(201).json(atividadeSalva);
  } catch (err) {
    res.status(400).json({ mensagem: "Erro ao criar atividade.", erro: err.message });
  }
};

// Listar todas as atividades
const listarAtividades = async (req, res) => {
  try {
    const atividades = await Activity.find();
    res.json(atividades);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao listar atividades.", erro: err.message });
  }
};

// Buscar atividade por ID
const obterAtividadePorId = async (req, res) => {
  try {
    const atividade = await Activity.findById(req.params.id);
    if (!atividade) {
      return res.status(404).json({ mensagem: "Atividade não encontrada." });
    }
    res.json(atividade);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao buscar atividade.", erro: err.message });
  }
};

// Atualizar atividade
const atualizarAtividade = async (req, res) => {
  try {
    const atividadeAtualizada = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!atividadeAtualizada) {
      return res.status(404).json({ mensagem: "Atividade não encontrada." });
    }
    res.json(atividadeAtualizada);
  } catch (err) {
    res.status(400).json({ mensagem: "Erro ao atualizar atividade.", erro: err.message });
  }
};

// Deletar atividade
const deletarAtividade = async (req, res) => {
  try {
    const atividadeRemovida = await Activity.findByIdAndDelete(req.params.id);
    if (!atividadeRemovida) {
      return res.status(404).json({ mensagem: "Atividade não encontrada." });
    }
    res.json({ mensagem: "Atividade deletada com sucesso." });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao deletar atividade.", erro: err.message });
  }
};

module.exports = {
  criarAtividade,
  listarAtividades,
  obterAtividadePorId,
  atualizarAtividade,
  deletarAtividade,
};

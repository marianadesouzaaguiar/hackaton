const mongoose = require("mongoose");

const perguntaSchema = new mongoose.Schema({
  pergunta: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ["aberta", "multipla_escolha"],
    default: "aberta",
  },
  opcoes: {
    type: [String],
    default: [],
  },
  respostaCorreta: {
    type: String,
    default: "",
  },
});

const activitySchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  nivelEscolar: {
    type: String,
    required: true,
  },
  materia: {
    type: String,
    required: true,
  },
  objetivo: {
    type: String,
    required: true,
  },
  perguntas: {
    type: [perguntaSchema],
    required: true,
    validate: {
      validator: (arr) =>
        Array.isArray(arr) && arr.every((p) => typeof p === "object" && p.pergunta),
      message: "Cada pergunta deve ser um objeto válido com campo 'pergunta'.",
    },
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Activity", activitySchema);

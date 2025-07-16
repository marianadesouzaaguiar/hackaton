const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'O campo "titulo" é obrigatório.']
  },
  descricao: {
    type: String,
    required: [true, 'O campo "descricao" é obrigatório.']
  },
  nivelEscolar: {
    type: String,
    required: [true, 'O campo "nivelEscolar" é obrigatório.']
  },
  materia: {
    type: String,
    required: [true, 'O campo "materia" é obrigatório.']
  },
  objetivo: {
    type: String,
    required: [true, 'O campo "objetivo" é obrigatório.']
  },
  perguntas: {
    type: [String],
    required: [true, 'O campo "perguntas" é obrigatório.'],
    validate: {
      validator: (v) => Array.isArray(v) && v.length > 0,
      message: 'Deve haver ao menos uma pergunta.'
    }
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', activitySchema);

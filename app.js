const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Conectar ao MongoDB e iniciar servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Servidor rodando na porta 5000')))
  .catch(err => console.error(err));

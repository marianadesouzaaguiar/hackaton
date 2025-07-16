require('dotenv').config(); // Carregar variáveis do .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const iaRoutes = require('./routes/iaRoutes');
const atividadeRoutes = require('./routes/atividadeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/ia', iaRoutes);
app.use('/api/atividades', atividadeRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
  })
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

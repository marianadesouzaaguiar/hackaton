require("dotenv").config();
console.log("🔐 JWT_SECRET carregado:", process.env.JWT_SECRET);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const atividadeRoutes = require("./routes/atividadeRoutes");
const aiRoutes = require("./routes/aiRoutes"); // ⬅ adicionado

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar:", err));

app.use("/auth", authRoutes);
app.use("/atividades", atividadeRoutes);
app.use("/ia", aiRoutes); // ⬅ agora rota POST /ia/gerar

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

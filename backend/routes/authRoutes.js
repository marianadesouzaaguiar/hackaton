const express = require("express");
const router = express.Router();

const usuarios = []; // Em produção, você usaria banco de dados

// Registro de usuário
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }

  const existente = usuarios.find((u) => u.email === email);
  if (existente) {
    return res.status(409).json({ mensagem: "Usuário já existe." });
  }

  usuarios.push({ name, email, password });
  return res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
  }

  const usuario = usuarios.find((u) => u.email === email && u.password === password);

  if (!usuario) {
    return res.status(401).json({ mensagem: "Credenciais inválidas." });
  }

  return res.status(200).json({ mensagem: "Login realizado com sucesso!" });
});

module.exports = router;

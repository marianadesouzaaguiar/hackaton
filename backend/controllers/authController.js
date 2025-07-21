const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Registro de usuário
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ mensagem: "Preencha todos os campos." });
  }

  try {
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(409).json({ mensagem: "Usuário já existe." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const novo = new User({ name, email, password: hashedPassword });
    await novo.save();

    console.log("✅ Novo usuário registrado:", email);
    return res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao registrar:", err);
    return res.status(500).json({ mensagem: "Erro interno no registro." });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("📩 Tentativa de login:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ Usuário não encontrado:", email);
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    const senhaCorreta = await bcrypt.compare(password, user.password);
    if (!senhaCorreta) {
      console.log("❌ Senha incorreta para:", email);
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    console.log("🔐 JWT_SECRET em uso:", process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Login bem-sucedido. Token gerado:", token);

    return res.status(200).json({
      mensagem: "Login realizado com sucesso!",
      token,
    });
  } catch (err) {
    console.error("❌ Erro no login:", err);
    return res.status(500).json({ mensagem: "Erro ao fazer login." });
  }
};

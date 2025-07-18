const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const novoUsuario = new User({ nome, email, senha: senhaCriptografada });
    await novoUsuario.save();

    const token = jwt.sign({ userId: novoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, usuario: novoUsuario });
  } catch (err) {
    if (err.code === 11000 && err.keyValue?.email) {
      return res.status(400).json({ mensagem: 'Este e-mail já está em uso.' });
    }
    res.status(500).json({ mensagem: 'Erro ao registrar usuário', erro: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
  }

  try {
    const usuario = await User.findOne({ email });

    if (!usuario || !usuario.senha) {
      return res.status(400).json({ mensagem: 'Usuário não encontrado ou senha não cadastrada' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, usuario });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no login', erro: err.message });
  }
};

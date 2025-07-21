const jwt = require("jsonwebtoken");

// function verificarToken(req, res, next) {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ mensagem: "Token não fornecido." });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.usuario = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ mensagem: "Token inválido ou expirado." });
//   }
// }
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("🔐 Cabeçalho de autorização:", authHeader);

  const token = authHeader?.split(" ")[1];
  if (!token) {
    console.log("❌ Token ausente.");
    return res.status(401).json({ mensagem: "Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    console.log("✅ Token verificado:", decoded);
    next();
  } catch (err) {
    console.log("❌ Token inválido:", err.message);
    return res.status(401).json({ mensagem: "Token inválido ou expirado." });
  }
}

module.exports = verificarToken;

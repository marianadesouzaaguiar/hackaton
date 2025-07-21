const axios = require("axios");

exports.generateTextWithOpenRouter = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct", // atualize conforme o modelo liberado
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("Erro na OpenRouter:", err.response?.data || err.message);
    throw new Error("Erro ao gerar texto com IA.");
  }
};

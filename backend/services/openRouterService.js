const axios = require('axios');

const generateTextWithOpenRouter = async (prompt) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo', // ou "mistralai/mistral-7b-instruct"
        messages: [
          {
            role: 'system',
            content: 'Você é um gerador de atividades educacionais criativas para professores do ensino fundamental.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'http://localhost:3000', // ou o seu domínio
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0]?.message?.content || 'Sem resposta';
  } catch (error) {
    console.error('Erro ao usar OpenRouter:', error.response?.data || error.message);
    throw new Error('Falha ao gerar atividade com OpenRouter');
  }
};

module.exports = { generateTextWithOpenRouter };

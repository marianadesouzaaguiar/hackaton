import api from './api';

export const gerarAtividadeComIA = async (prompt) => {
  const token = localStorage.getItem('token');
  const response = await api.post('/ai/generate', { prompt }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditarAtividade() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [atividade, setAtividade] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchAtividade = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/atividades/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAtividade(res.data);
      } catch (err) {
        console.error(err);
        setErro("Erro ao carregar atividade.");
      } finally {
        setCarregando(false);
      }
    };

    fetchAtividade();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAtividade((prev) => ({ ...prev, [name]: value }));
  };

  const atualizarPergunta = (index, valor) => {
    const novas = [...atividade.perguntas];
    novas[index].pergunta = valor;
    setAtividade((prev) => ({ ...prev, perguntas: novas }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/atividades/${id}`, atividade, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Atividade atualizada com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar atividade.");
    }
  };

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  return (
    <div style={styles.container}>
      <h2>✏️ Editar Atividade</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="titulo"
          value={atividade.titulo}
          onChange={handleChange}
          placeholder="Título"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="materia"
          value={atividade.materia}
          onChange={handleChange}
          placeholder="Matéria"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="nivelEscolar"
          value={atividade.nivelEscolar}
          onChange={handleChange}
          placeholder="Nível Escolar"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="objetivo"
          value={atividade.objetivo}
          onChange={handleChange}
          placeholder="Objetivo"
          required
          style={styles.input}
        />
        <textarea
          name="descricao"
          value={atividade.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          required
          style={styles.textarea}
        />

        <h4>Perguntas:</h4>
        {atividade.perguntas.map((p, i) => (
          <input
            key={i}
            type="text"
            value={p.pergunta}
            onChange={(e) => atualizarPergunta(i, e.target.value)}
            placeholder={`Pergunta ${i + 1}`}
            style={styles.input}
            required
          />
        ))}

        <button type="submit" style={styles.botao}>
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    minHeight: "100px",
    fontSize: "1rem",
  },
  botao: {
    padding: "0.7rem",
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
  },
};

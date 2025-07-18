import React, { useState } from "react";
import axios from "axios";

export default function CreateActivity() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!titulo || !descricao) {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/atividades",
        { titulo, descricao },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Atividade criada com sucesso!");
      setTitulo("");
      setDescricao("");
    } catch (err) {
      alert("Erro ao criar atividade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Nova Atividade</h2>
        <input
          type="text"
          placeholder="Título da atividade"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Descrição detalhada"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={styles.textarea}
        />
        <button onClick={handleCreate} style={styles.button} disabled={loading}>
          {loading ? "Salvando..." : "Criar"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    resize: "vertical",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0077cc",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

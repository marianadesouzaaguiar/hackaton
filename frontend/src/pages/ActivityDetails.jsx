import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ActivityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [atividade, setAtividade] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAtividade = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/atividades/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAtividade(response.data);
      } catch (err) {
        console.error("Erro ao carregar detalhes:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAtividade();
  }, [id]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Detalhes da Atividade</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : atividade ? (
          <>
            <h3 style={styles.subtitle}>{atividade.titulo}</h3>
            <p style={styles.description}>{atividade.descricao}</p>
            <p><strong>Nível escolar:</strong> {atividade.nivelEscolar}</p>
            <p><strong>Matéria:</strong> {atividade.materia}</p>
            <p><strong>Objetivo:</strong> {atividade.objetivo}</p>
          </>
        ) : (
          <p>Atividade não encontrada.</p>
        )}

        <button style={styles.button} onClick={() => navigate("/dashboard")}>
          Voltar
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
    maxWidth: "600px",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

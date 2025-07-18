import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AtividadeLista() {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarAtividades = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/lista", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAtividades(response.data);
      } catch (err) {
        alert("Erro ao carregar atividades.");
      } finally {
        setLoading(false);
      }
    };

    carregarAtividades();
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Lista de Atividades</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : atividades.length === 0 ? (
          <p>Nenhuma atividade encontrada.</p>
        ) : (
          <ul style={styles.list}>
            {atividades.map((atividade) => (
              <li key={atividade._id} style={styles.item}>
                <strong>{atividade.titulo}</strong>
                <p>{atividade.descricao}</p>
              </li>
            ))}
          </ul>
        )}
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
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    padding: "15px",
    borderBottom: "1px solid #eee",
    marginBottom: "10px",
    borderRadius: "6px",
    backgroundColor: "#fafafa",
  },
};

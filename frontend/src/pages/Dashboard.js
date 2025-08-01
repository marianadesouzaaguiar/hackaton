import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { logout } from "../utils/logout";

export default function AtividadeLista() {
  const [atividades, setAtividades] = useState([]);
  const [busca, setBusca] = useState("");
  const [filtroMateria, setFiltroMateria] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordemAsc, setOrdemAsc] = useState(true);

  const atividadesPorPagina = 5;
  const navigate = useNavigate();

  const buscarAtividades = async () => {
    setCarregando(true);
    setErro(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/atividades", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAtividades(res.data);
    } catch (err) {
      console.error("Erro ao buscar atividades:", err);
      if (err.response && err.response.status === 401) {
        alert("Sua sessão expirou. Faça login novamente.");
        logout(navigate);
      } else {
        setErro("Erro ao buscar atividades.");
      }
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarAtividades();
  }, []);

  const materiasUnicas = [...new Set(atividades.map((a) => a.materia))];

  const atividadesFiltradas = atividades
    .filter((a) => {
      const buscaLower = busca.toLowerCase();
      return (
        (!filtroMateria || a.materia === filtroMateria) &&
        (a.titulo.toLowerCase().includes(buscaLower) ||
          a.descricao.toLowerCase().includes(buscaLower))
      );
    })
    .sort((a, b) =>
      ordemAsc
        ? a.titulo.localeCompare(b.titulo)
        : b.titulo.localeCompare(a.titulo)
    );

  const totalPaginas = Math.ceil(
    atividadesFiltradas.length / atividadesPorPagina
  );
  const inicio = (paginaAtual - 1) * atividadesPorPagina;
  const atividadesPaginadas = atividadesFiltradas.slice(
    inicio,
    inicio + atividadesPorPagina
  );

  const exportarCSV = () => {
    const cabecalho = "Título,Matéria,Descrição\n";
    const linhas = atividadesFiltradas
      .map((a) => `"${a.titulo}","${a.materia}","${a.descricao}"`)
      .join("\n");
    const blob = new Blob([cabecalho + linhas], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "atividades.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Atividades", 14, 10);
    doc.autoTable({
      head: [["Título", "Matéria", "Descrição"]],
      body: atividadesFiltradas.map((a) => [
        a.titulo,
        a.materia,
        a.descricao.length > 80 ? a.descricao.slice(0, 77) + "..." : a.descricao,
      ]),
      startY: 20,
      styles: {
        fontSize: 10,
        cellWidth: "wrap",
      },
      headStyles: {
        fillColor: [0, 119, 204],
        textColor: 255,
        halign: "center",
      },
      bodyStyles: {
        valign: "top",
      },
    });
    doc.save("atividades.pdf");
  };

  const excluirAtividade = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta atividade?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/atividades/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Atividade excluída com sucesso!");
      buscarAtividades();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Sessão expirada. Faça login novamente.");
        logout(navigate);
      } else {
        alert("Erro ao excluir atividade.");
        console.error(err);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>📚 Lista de Atividades</h2>
        <Link to="/atividades" style={styles.criarBtn}>
          ➕ Criar Atividade
        </Link>
      </div>

      <div style={styles.filtros}>
        <input
          type="text"
          placeholder="Buscar..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={styles.input}
        />
        <select
          value={filtroMateria}
          onChange={(e) => setFiltroMateria(e.target.value)}
          style={styles.select}
        >
          <option value="">Todas as matérias</option>
          {materiasUnicas.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button onClick={() => setOrdemAsc(!ordemAsc)} style={styles.botao}>
          Ordenar {ordemAsc ? "↓ Z-A" : "↑ A-Z"}
        </button>
        <button onClick={exportarCSV} style={styles.botao}>
          Exportar CSV
        </button>
        <button onClick={exportarPDF} style={styles.botao}>
          Exportar PDF
        </button>
      </div>

      {carregando ? (
        <p>Carregando...</p>
      ) : erro ? (
        <p style={styles.erro}>{erro}</p>
      ) : atividadesPaginadas.length === 0 ? (
        <p>Nenhuma atividade encontrada.</p>
      ) : (
        <>
          <ul style={styles.lista}>
            {atividadesPaginadas.map((a) => (
              <li key={a._id} style={styles.item}>
                <div>
                  <strong>{a.titulo}</strong> — {a.materia}
                  <p style={styles.descricao}>{a.descricao}</p>
                </div>
                <div style={styles.acoes}>
                  <Link to={`/details/${a._id}`} style={styles.link}>
                    Ver
                  </Link>
                  <Link to={`/editar/${a._id}`} style={styles.botaoSecundario}>
                    Editar
                  </Link>
                  <button
                    onClick={() => excluirAtividade(a._id)}
                    style={{
                      ...styles.botaoSecundario,
                      backgroundColor: "#e74c3c",
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={styles.paginacao}>
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button
                key={i}
                onClick={() => setPaginaAtual(i + 1)}
                style={{
                  ...styles.pagina,
                  backgroundColor: i + 1 === paginaAtual ? "#0077cc" : "#eee",
                  color: i + 1 === paginaAtual ? "#fff" : "#000",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "2rem", fontFamily: "Arial, sans-serif" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  criarBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#2ecc71",
    color: "#fff",
    textDecoration: "none",
    borderRadius: 5,
    fontWeight: "bold",
  },
  filtros: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "1rem",
  },
  input: {
    padding: "0.5rem",
    flex: 1,
    minWidth: "200px",
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  select: {
    padding: "0.5rem",
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  botao: {
    padding: "0.5rem 1rem",
    backgroundColor: "#0077cc",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  erro: { color: "red" },
  lista: { listStyle: "none", padding: 0 },
  item: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  descricao: { fontSize: "0.9rem", color: "#555", marginTop: "0.5rem" },
  link: {
    textDecoration: "none",
    color: "#0077cc",
    fontWeight: "bold",
  },
  acoes: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  botaoSecundario: {
    padding: "0.4rem 0.8rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#f1c40f",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "none",
  },
  paginacao: {
    marginTop: "1rem",
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  pagina: {
    padding: "0.4rem 0.8rem",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};

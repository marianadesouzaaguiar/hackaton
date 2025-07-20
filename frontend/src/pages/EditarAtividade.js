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

  const atualizarCampo = (campo, valor) => {
    setAtividade({ ...atividade, [campo]: valor });
  };

  const atualizarPergunta = (index, campo, valor) => {
    const novas = [...atividade.perguntas];
    novas[index][campo] = valor;
    setAtividade({ ...atividade, perguntas: novas });
  };

  const atualizarOpcao = (indexPergunta, indexOpcao, valor) => {
    const novas = [...atividade.perguntas];
    novas[indexPergunta].opcoes[indexOpcao] = valor;
    setAtividade({ ...atividade, perguntas: novas });
  };

  const adicionarOpcao = (indexPergunta) => {
    const novas = [...atividade.perguntas];
    novas[indexPergunta].opcoes.push("");
    setAtividade({ ...atividade, perguntas: novas });
  };

  const removerPergunta = (index) => {
    const novas = atividade.perguntas.filter((_, i) => i !== index);
    setAtividade({ ...atividade, perguntas: novas });
  };

  const adicionarPergunta = () => {
    const novas = [
      ...atividade.perguntas,
      {
        pergunta: "",
        tipo: "aberta",
        opcoes: [],
        respostaCorreta: "",
      },
    ];
    setAtividade({ ...atividade, perguntas: novas });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("🛠 Enviando:", atividade);
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/atividades/${id}`, atividade, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Atividade atualizada com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro ao atualizar atividade:", err.response?.data || err.message);
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
          onChange={(e) => atualizarCampo("titulo", e.target.value)}
          placeholder="Título"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="materia"
          value={atividade.materia}
          onChange={(e) => atualizarCampo("materia", e.target.value)}
          placeholder="Matéria"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="nivelEscolar"
          value={atividade.nivelEscolar}
          onChange={(e) => atualizarCampo("nivelEscolar", e.target.value)}
          placeholder="Nível Escolar"
          required
          style={styles.input}
        />
        <input
          type="text"
          name="objetivo"
          value={atividade.objetivo}
          onChange={(e) => atualizarCampo("objetivo", e.target.value)}
          placeholder="Objetivo"
          required
          style={styles.input}
        />
        <textarea
          name="descricao"
          value={atividade.descricao}
          onChange={(e) => atualizarCampo("descricao", e.target.value)}
          placeholder="Descrição"
          required
          style={styles.textarea}
        />

        <h4>Perguntas:</h4>
        {atividade.perguntas.map((p, i) => (
          <div key={i} style={styles.perguntaBox}>
            <input
              type="text"
              value={p.pergunta}
              onChange={(e) => atualizarPergunta(i, "pergunta", e.target.value)}
              placeholder={`Pergunta ${i + 1}`}
              required
              style={styles.input}
            />

            <select
              value={p.tipo}
              onChange={(e) => atualizarPergunta(i, "tipo", e.target.value)}
              style={styles.select}
            >
              <option value="aberta">Aberta</option>
              <option value="multipla_escolha">Múltipla Escolha</option>
            </select>

            {p.tipo === "multipla_escolha" && (
              <>
                <p>Opções:</p>
                {p.opcoes?.map((op, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={op}
                    onChange={(e) => atualizarOpcao(i, idx, e.target.value)}
                    placeholder={`Opção ${idx + 1}`}
                    style={styles.input}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => adicionarOpcao(i)}
                  style={styles.miniBotao}
                >
                  ➕ Adicionar Opção
                </button>
                <input
                  type="text"
                  placeholder="Resposta Correta"
                  value={p.respostaCorreta}
                  onChange={(e) => atualizarPergunta(i, "respostaCorreta", e.target.value)}
                  style={styles.input}
                />
              </>
            )}

            <button
              type="button"
              onClick={() => removerPergunta(i)}
              style={styles.removerBotao}
            >
              Remover Pergunta
            </button>
          </div>
        ))}

        <button type="button" onClick={adicionarPergunta} style={styles.miniBotao}>
          ➕ Nova Pergunta
        </button>

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
    maxWidth: "700px",
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
  select: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  perguntaBox: {
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "6px",
    marginBottom: "1rem",
    backgroundColor: "#f9f9f9",
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
  miniBotao: {
    padding: "0.4rem 0.7rem",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
  },
  removerBotao: {
    padding: "0.4rem 0.7rem",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
  },
};

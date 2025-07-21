import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateActivity() {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    nivelEscolar: "",
    materia: "",
    objetivo: "",
    perguntas: [
      {
        pergunta: "",
        tipo: "aberta",
        opcoes: [],
        respostaCorreta: "",
      },
    ],
  });

  const [temaIA, setTemaIA] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const atualizarCampo = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
  };

  const atualizarPergunta = (index, campo, valor) => {
    const novas = [...form.perguntas];
    novas[index][campo] = valor;
    setForm({ ...form, perguntas: novas });
  };

  const atualizarOpcao = (indexPergunta, indexOpcao, valor) => {
    const novas = [...form.perguntas];
    novas[indexPergunta].opcoes[indexOpcao] = valor;
    setForm({ ...form, perguntas: novas });
  };

  const adicionarOpcao = (indexPergunta) => {
    const novas = [...form.perguntas];
    novas[indexPergunta].opcoes.push("");
    setForm({ ...form, perguntas: novas });
  };

  const adicionarPergunta = () => {
    setForm({
      ...form,
      perguntas: [
        ...form.perguntas,
        {
          pergunta: "",
          tipo: "aberta",
          opcoes: [],
          respostaCorreta: "",
        },
      ],
    });
  };

  const removerPergunta = (index) => {
    const novas = form.perguntas.filter((_, i) => i !== index);
    setForm({ ...form, perguntas: novas });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/atividades", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Atividade criada com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro ao criar atividade:", err.response?.data || err.message);
      alert("Erro ao criar atividade.");
    } finally {
      setCarregando(false);
    }
  };

  const gerarComIA = async () => {
    if (!temaIA.trim()) {
      alert("Informe um tema para gerar com IA.");
      return;
    }

    try {
      setCarregando(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token não encontrado. Faça login novamente.");

      const res = await axios.post(
        "http://localhost:5000/atividades/gerar",
        { tema: temaIA },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const textoGerado = res.data.sugestao;
      if (!textoGerado) throw new Error("Resposta da IA vazia.");

      atualizarCampo("descricao", textoGerado);
      alert("Atividade gerada com IA! Você pode ajustar e salvar.");
    } catch (err) {
      console.error("Erro ao gerar com IA:", err.response?.data || err.message);
      alert("Erro ao gerar atividade com IA. Verifique seu login ou o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>➕ Criar Nova Atividade</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => atualizarCampo("titulo", e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Matéria"
          value={form.materia}
          onChange={(e) => atualizarCampo("materia", e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Nível Escolar"
          value={form.nivelEscolar}
          onChange={(e) => atualizarCampo("nivelEscolar", e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Objetivo"
          value={form.objetivo}
          onChange={(e) => atualizarCampo("objetivo", e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => atualizarCampo("descricao", e.target.value)}
          required
          style={styles.textarea}
        />

        <input
          type="text"
          placeholder="Tema para gerar com IA com materia e nivel escolar"
          value={temaIA}
          onChange={(e) => setTemaIA(e.target.value)}
          style={styles.input}
        />
        <button type="button" onClick={gerarComIA} style={styles.miniBotao}>
          🤖 Gerar com IA
        </button>

        <h4>Perguntas:</h4>
        {form.perguntas.map((p, i) => (
          <div key={i} style={styles.perguntaBox}>
            <input
              type="text"
              placeholder={`Pergunta ${i + 1}`}
              value={p.pergunta}
              onChange={(e) => atualizarPergunta(i, "pergunta", e.target.value)}
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
                {p.opcoes.map((op, idx) => (
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
                  onChange={(e) =>
                    atualizarPergunta(i, "respostaCorreta", e.target.value)
                  }
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

        <button type="submit" disabled={carregando} style={styles.botao}>
          {carregando ? "Salvando..." : "Salvar Atividade"}
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

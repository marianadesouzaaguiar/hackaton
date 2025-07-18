import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [name, setName] = useState(""); // campo correto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // campo correto
  const navigate = useNavigate();

  const register = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password, // nomes devem bater com o backend
      });

      alert(response.data.mensagem);
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Erro no registro: " + (err.response?.data?.mensagem || err.message));
    }
  };

  return (
    <div style={styles.container}>
      <h2>Cadastro</h2>
      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={register} style={styles.button}>Cadastrar</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "300px",
    margin: "80px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#0077cc",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

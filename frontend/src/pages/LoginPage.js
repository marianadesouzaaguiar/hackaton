import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // corrigido
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password, // corrigido
      });

      localStorage.setItem("token", response.data.token);
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      alert("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Erro ao fazer login: " + (err.response?.data?.mensagem || err.message));
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
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
        onChange={(e) => setPassword(e.target.value)} // corrigido
        style={styles.input}
      />
      <button onClick={login} style={styles.button}>Entrar</button>
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

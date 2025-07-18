import React from "react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Bem-vindo, {user?.name ? user.name : "usuário"}!
      </h2>
      <p style={styles.email}>
        {user?.email ? `Email: ${user.email}` : "Sem informações adicionais"}
      </p>
      <button onClick={logout} style={styles.button}>
        Sair
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: "bold",
  },
  email: {
    marginBottom: "20px",
    fontSize: "16px",
    color: "#555",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

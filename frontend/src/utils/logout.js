// src/utils/logout.js
export function logout(navigate) {
    localStorage.removeItem("token");
    navigate("/login");
  }
  
// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ActivityDetails from "./pages/ActivityDetails";
import CreateActivity from "./components/AtividadeForm";
import EditarAtividade from "./pages/EditarAtividade";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/atividades" element={<CreateActivity />} />
        <Route path="/details/:id" element={<ActivityDetails />} />
        <Route path="/editar/:id" element={<EditarAtividade />} />
      </Routes>
    </Router>
  );
}

export default App;

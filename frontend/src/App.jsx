import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ActivityDetails from "./pages/ActivityDetails";
import CreateActivity from "./components/AtividadeForm";
import EditarAtividade from "./pages/EditarAtividade";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/atividades"
          element={
            <PrivateRoute>
              <CreateActivity />
            </PrivateRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <PrivateRoute>
              <ActivityDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar/:id"
          element={
            <PrivateRoute>
              <EditarAtividade />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

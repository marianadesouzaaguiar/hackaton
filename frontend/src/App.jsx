import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ActivityDetails from './pages/ActivityDetails';
import AtividadeLista from './components/AtividadeLista';
import CreateActivity from './components/AtividadeForm'; // ou use AtividadeForm aqui

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/atividades" element={<CreateActivity />} />
        <Route path="/details/:id" element={<ActivityDetails />} />
        <Route path="/lista" element={<AtividadeLista />} />
      </Routes>
    </Router>
  );
}

export default App;

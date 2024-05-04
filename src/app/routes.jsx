import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './dashboard/Home';
import BookDetails from './dashboard/BookDetails'; // Importe o componente BookDetails

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} /> {/* Rota para os detalhes do livro */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
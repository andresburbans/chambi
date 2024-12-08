import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import RegistroCliente from "./pages/RegistroCliente";
import RegistroExperto from "./pages/RegistroExperto";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registro-cliente" element={<RegistroCliente />} />
        <Route path="/registro-experto" element={<RegistroExperto />} />
      </Routes>
    </Router>
  );
};

export default App;

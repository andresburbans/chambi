import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import RegistroCliente from './pages/RegistroCliente';
import RegistroExperto from './pages/RegistroExperto';
import SearchServices from './pages/SearchServices';
import PerfilCliente from './pages/PerfilCliente';
import PerfilExperto from './pages/PerfilExperto';
import AddEspecialidad from './pages/AddEspecialidad';
import AddEService from './pages/AddEService ';

// Importa los componentes Header y Footer si los vas a usar
//import Header from './components/Header';
//import Footer from './components/Footer';

function App() {
  return (
    <Router>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<SearchServices />} />

        {/* Rutas para pruebas (sin protección) - Elimina estas en producción */}
        <Route path="/add-servicio" element={<AddEService />} />
        <Route path="/edd-especialidad" element={<AddEspecialidad />} />

        {/* Rutas para pruebas (sin protección) - Elimina estas en producción */}
        <Route path="/perfil-cliente" element={<PerfilCliente />} />
        <Route path="/perfil-experto" element={<PerfilExperto />} />

        {/* Rutas para pruebas (sin protección) - Elimina estas en producción */}
        <Route path="/registro-cliente" element={<RegistroCliente />} />
        <Route path="/registro-experto" element={<RegistroExperto />} />

        {/* Rutas protegidas (para producción) - Agrega tu lógica de protección aquí*/}
        {/*
          <Route path="/registro-cliente" element={
            <RequireAuth> <RegistroCliente/> </RequireAuth>
          } />
          <Route path="/registro-experto" element={
            <RequireAuth> <RegistroExperto/> </RequireAuth>
          } /> 
          */}
      </Routes>

    </Router>
  );
}

export default App;
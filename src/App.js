import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SearchPage from './pages/SearchPage'; // Nueva página

const App = () => {
  const [searchType, setSearchType] = useState(null); // "Servicios" o "Especialistas"

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setSearchType={setSearchType} />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<SearchPage searchType={searchType} />} />
      </Routes>
    </Router>
  );
};

export default App;

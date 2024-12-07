import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app'; // Importa el componente principal App
import './css/index.css'; // Importa el CSS global

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MiApi from './assets/components/miApi'; // Asegúrate de que el path del import sea correcto
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando estilos de Bootstrap

function App() {
    return (
        <Router>
            <div className="container mt-3">
                <h1>Bienvenido a la Pokédex</h1>
                <nav>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/pokemons" className="nav-link">Ver Pokémon</Link>
                        </li>
                    </ul>
                </nav>

                {/* Configuración de rutas */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pokemons" element={<MiApi />} />
                </Routes>
            </div>
        </Router>
    );
}

// Componente para la página de inicio
function Home() {
    return (
        <div>
            <p>Explora el mundo de Pokémon</p>
        </div>
    );
}

export default App;


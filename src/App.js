import './styles/global.scss';
import './styles/home.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Projects from "./pages/Projects";
import About from './pages/About'; // Importando a página About
import Header from './components/Header/Header';
import React, { useState } from "react";
import CreateJson from './pages/CreateJson';

function App() {
  const [selected, setSelected] = useState([]);
  const [language, setLanguage] = useState("pt"); // Adicione o estado para a linguagem

  return (
    <Router>
      <div className="App">
        {/* Passa setLanguage como prop para o Header */}
        <Header setLanguage={setLanguage} lang={language} />

        {/* Define as rotas */}
        <Routes>
          {/* Rota para a página inicial (Projects) */}
          <Route path="/" element={<Projects lang={language} />} />

          {/* Rota para a página About */}
          <Route path="/about" element={<About lang={language} />} />

          <Route path="/create" element={<CreateJson />} />
        </Routes>
      </div>


      <footer className="footer">
        <p>This website was developed by <a href="https://www.linkedin.com/in/jovit/" target="_blank" rel="noopener noreferrer">@Archs</a></p>
      </footer>


    </Router>
  );
}

export default App;
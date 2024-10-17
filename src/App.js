import Card from "./components/Card/Card";
import Filter from "./components/Filter/Filter";
import './styles/global.scss';
import './styles/home.scss';
import Header from "./components/Header/Header";
import Projects from "./pages/Projects"

import { useState } from 'react';

const data = [
  {
    "title": "Feminist Foreign Policy: A Framework",
    "tags": ["Human rights", "Feminist data"],
    "organization": "Center for Research on Women",
    "author": "Lyric Thompson",
    "year": "2020",
    "language": ["English"],
    "link": "https://drive.google.com/drive/folders/1K-4i_CRuBCHcjVwsgg9pnrEh0QJ2VR40?usp=drive_link",
    "type": "Report",
    "region": "North America (US and Canada)",
    "source": "Academia"
  },
  {
    "title": "Defining Feminist Foreign Policy: The 2023 Edition",
    "tags": ["Care", "Health"],
    "organization": "Feminist Foreign Polict Collaborative",
    "author": "Lyric Thompson, Spogmay Ahmed, Beatriz Silva, Jillian Montilla",
    "year": "2023",
    "language": ["English", "French"],
    "link": "https://drive.google.com/drive/folders/1y7aeQYj9aI8vqeUKCwsYrwB3dHHgBJBG?usp=drive_link",
    "type": "Report",
    "region": "North America (US and Canada)",
    "source": "Individual"
  }
]

function App() {
  // Estados para os filtros
  const [type, setType] = useState('');
  const [region, setRegion] = useState('');
  const [source, setSource] = useState('');
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [author, setAuthor] = useState('');

  // Função para filtrar os dados
  const filteredData = data.filter(card => {
    const matchesType = type ? card.type.toLowerCase().includes(type.toLowerCase()) : true;
    const matchesRegion = region ? card.region.toLowerCase().includes(region.toLowerCase()) : true;
    const matchesSource = source ? card.source.toLowerCase().includes(source.toLowerCase()) : true;
    const matchesThemes = selectedThemes.length > 0 
      ? selectedThemes.every(theme => card.tags.some(tag => tag.toLowerCase().includes(theme.value.toLowerCase())))
      : true;
    const matchesSearchTerm = searchTerm ? card.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const matchesAuthor = author ? card.author.toLowerCase().includes(author.toLowerCase()) : true;
    return matchesType && matchesRegion && matchesSource && matchesThemes && matchesSearchTerm && matchesAuthor;
  });

  return (
    <div className="App">

      <Projects />

    </div>
  );
}

export default App;

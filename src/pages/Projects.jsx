import Card from "../components/Card/Card";
import Filter from "../components/Filter/Filter";
import '../styles/global.scss';
import '../styles/home.scss';
import infos from '../data/infos.json'; 
import cards from "../data/cards.json"; 
import { useState } from 'react';

const data = cards["Cards"]

function Projects(props) {
  // Estados para os filtros
  const [type, setType] = useState([]);
  const [region, setRegion] = useState([]);
  const [source, setSource] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [author, setAuthor] = useState([]);
  const [organization, setOrganization] = useState([]);
  const [paids, setPaid] = useState([]); // Novo estado para o filtro de pagamento
  const [languageFilter, setLanguageFilter] = useState([]);

  let lang = props.lang;

  // Função para extrair autores únicos
  const getUniqueAuthors = () => {
    const authors = data.map(card => card.author).flat();
    return [...new Set(authors)];
  };

  // Função para extrair organizações únicas
  const getUniqueOrganizations = () => {
    const organizations = data.map(card => card.organization);
    return [...new Set(organizations)];
  };

  // Gerar listas de autores e organizações
  const authorsList = getUniqueAuthors().map(author => ({
    label: author,
    value: author
  }));

  const organizationsList = getUniqueOrganizations().map(org => ({
    label: org,
    value: org
  }));

  // Função para filtrar os dados
  const filteredData = data.filter(card => {
    // Verifica se há correspondência de tipo
    const matchesType = type.length > 0
      ? type.some(t => card.type.includes(t))
      : true;

    // Verifica se há correspondência de região
    const matchesRegion = region.length > 0
      ? region.some(r => card.region.includes(r))
      : true;

    // Verifica se há correspondência de fonte
    const matchesSource = source.length > 0
      ? source.some(s => card.source.includes(s))
      : true;

    // Verifica se há correspondência de temas
    const matchesThemes = selectedThemes.length > 0
      ? selectedThemes.every(theme => card.tags.some(tag => tag.includes(theme)))
      : true;

    // Verifica se há correspondência com o termo de pesquisa
    const matchesSearchTerm = searchTerm ? card.title.includes(searchTerm) : true;

    // Verifica se há correspondência de autor
    const matchesAuthor = author.length > 0
      ? author.some(a => card.author.some(cardAuthor => cardAuthor.includes(a)))
      : true;

    // Verifica se há correspondência de organização
    const matchesOrganization = organization.length > 0
      ? organization.some(org => card.organization.includes(org))
      : true;

    // Verifica se há correspondência de pagamento
    const matchesPaid = paids.length > 0
      ? paids.includes(card.paid)
      : true;

    const matchesLanguage = languageFilter.length > 0
        ? languageFilter.some(lang => card.language.includes(lang))
        : true;


    // Retorna verdadeiro se todos os filtros corresponderem
    return matchesType && matchesRegion && matchesSource &&
           matchesThemes && matchesSearchTerm && matchesLanguage;
    });

  return (
    <div className="App">

      <div className="home-infos">
        <span className="home-title">{infos[lang]["Texts"]["Projects"]["Title"]}</span>
        <span className="home-description">{infos[lang]["Texts"]["Projects"]["Phrase1"]}</span>
        <span className="home-description bolder ">{infos[lang]["Texts"]["Projects"]["Phrase2"]} <a href={infos[lang]["Texts"]["Projects"]["terms"]} className="link-terms" target="_blank">{infos[lang]["Texts"]["Projects"]["Phrase2-terms"]}</a> {infos[lang]["Texts"]["Projects"]["Phrase2-1"]}</span>
        <a href={infos[lang]["Texts"]["Projects"]["contact"]} target="_blank" className="home-description link">{infos[lang]["Texts"]["Projects"]["Phrase3"]}</a>
        <span className="home-description how">{infos[lang]["Texts"]["Projects"]["Phrase4"]}</span>
        <span className="home-description">{infos[lang]["Texts"]["Projects"]["Phrase5"]}</span>
      </div>

      <Filter
        lang={lang}
        type={type}
        setType={setType}
        region={region}
        setRegion={setRegion}
        source={source}
        setSource={setSource}
        selectedThemes={selectedThemes}
        setSelectedThemes={setSelectedThemes}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        author={author}
        setAuthor={setAuthor}
        organization={organization}
        setOrganization={setOrganization}
        paid={paids}
        setPaid={setPaid} // Adiciona o estado de pagamento ao filtro
        authorsList={authorsList}
        organizationsList={organizationsList}
        languageFilter={languageFilter}
        setLanguageFilter={setLanguageFilter}
        language={lang}
      />

      <div className="projects">
        <span className="projects-found">{filteredData.length} {infos[lang]["Texts"]["Projects"]["Founded"]}</span>

        <div className="project-view">

          {filteredData.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              tags={card.tags}
              organization={card.organization}
              author={card.author}
              year={card.year}
              language={card.language}
              link={card.link}
              lang={lang}
              paid={card.paid}
              region={card.region}
              source={card.source}
              type={card.type}
            />
          ))}

        </div>
      </div>
    </div>
  );
}

export default Projects;


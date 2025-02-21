import React, { useEffect, useState } from 'react';
import './Card.scss';
import { MdOutlineShare } from "react-icons/md";
import data from '../../data/infos.json';
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import translate from '../../data/translate.json';

const tagColors = data["en"]["Themes"];

// Função para traduzir os temas
const getTranslatedTheme = (theme, language) => {
  const themeTranslations = translate["Themes"][theme];
  if (!themeTranslations) return theme;

  const languageIndex = {
    "pt": 0,
    "fr": 1,
    "sp": 2,
    "hi": 3,
    "np": 4,
  }[language];

  return themeTranslations[languageIndex] || theme;
};

// Função para traduzir os tipos (types)
const getTranslatedType = (type, language) => {
  const typeTranslations = translate["Types"][type];
  if (!typeTranslations) return type;

  const languageIndex = {
    "pt": 0,
    "fr": 1,
    "sp": 2,
    "hi": 3,
    "np": 4,
  }[language];

  return typeTranslations[languageIndex] || type;
};

// Função para traduzir as regiões (regions)
const getTranslatedRegion = (region, language) => {
  const regionTranslations = translate["Regions"][region];
  if (!regionTranslations) return region;

  const languageIndex = {
    "pt": 0,
    "fr": 1,
    "sp": 2,
    "hi": 3,
    "np": 4,
  }[language];

  return regionTranslations[languageIndex] || region;
};

// Função para traduzir as fontes (sources)
const getTranslatedSource = (source, language) => {
  const sourceTranslations = translate["Sources"][source];
  if (!sourceTranslations) return source;

  const languageIndex = {
    "pt": 0,
    "fr": 1,
    "sp": 2,
    "hi": 3,
    "np": 4,
  }[language];

  return sourceTranslations[languageIndex] || source;
};

function Card(props) {
  const [isSaved, setIsSaved] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('LocalCards')) || [];
    const cardIsSaved = savedCards.some(savedCard => savedCard.title === props.title);
    setIsSaved(cardIsSaved);
  }, [props.title]);

  function acessLink(link) {
    window.open(link, "_blank");
  }

  function handleBookmark() {
    const savedCards = JSON.parse(localStorage.getItem('LocalCards')) || [];

    if (isSaved) {
      const updatedCards = savedCards.filter(savedCard => savedCard.title !== props.title);
      localStorage.setItem('LocalCards', JSON.stringify(updatedCards));
      setIsSaved(false);
    } else {
      savedCards.push({
        title: props.title,
        tags: props.tags,
        organization: props.organization,
        author: props.author,
        year: props.year,
        language: props.language,
        link: props.link,
        region: props.region,
        source: props.source,
        type: props.type
      });
      localStorage.setItem('LocalCards', JSON.stringify(savedCards));
      setIsSaved(true);
    }
  }

  function handleShare() {
    navigator.clipboard.writeText(props.link)
      .then(() => {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Erro ao copiar o link: ', err);
      });
  }

  return (
    <div className='card-container'>
      <div className='card-tag-paid'>
        {props.paid === 'Paywalled' ? <HiMiniCurrencyDollar className='icon-dolar'/> : (
          <span className={`card-paid ${props.paid}`}>{props.paid}</span>
        )}
      </div>

      <div className="card-title-area">
        <span className='card-title'>{props.title}</span>
      </div>

      <div className='card-tags-area'>
        <span className='area-name'>Tags</span>
        <span className='tags'>
          {props.tags.map((tag) => (
            <span
              key={tag}
              className='tag'
              style={{ backgroundColor: `${tagColors[tag]}` }}
            >
              {getTranslatedTheme(tag, props.lang)}
            </span>
          ))}
        </span>
      </div>

      <div className='card-organization-area'>
        <span className='area-name'>{data[props.lang]["Texts"]["Projects"]["Card"]["Org"]}</span>
        <span className='organization'>{props.organization}</span>
      </div>

      <div className='card-author-area'>
        <span className='area-name'>{data[props.lang]["Texts"]["Projects"]["Card"]["Author"]}</span>
        <div className='author-list'>
          <span className='author'>{props.author.join(', ')}</span>
        </div>
      </div>

      <div className='card-language-area'>
        <span className='area-name'>{data[props.lang]["Texts"]["Projects"]["Card"]["Language"]}</span>
        <div className='language-row'>
          <span className='language'>{props.language.join(", ")}</span>
        </div>
      </div>

      <div className='card-region-area'>
        <span className='area-name'>{data[props.lang]["Texts"]["Projects"]["Card"]["Region"]}</span>
        <span className='region'>
          {props.region.map(region => getTranslatedRegion(region, props.lang)).join(" - ")}
        </span>
      </div>

      <div className='card-type-area'>
        <span className='area-name'>{data[props.lang]["Texts"]["Projects"]["Card"]["Type"]}</span>
        <span className='type'>{getTranslatedType(props.type, props.lang)}</span>
      </div>

      <div className='card-source-area'>
        <span className='area-name'>{data[props.lang]["Texts"]["Projects"]["Card"]["Source"]}</span>
        <span className='source'>{getTranslatedSource(props.source, props.lang)}</span>
      </div>

      <button className='btn-acess' onClick={() => acessLink(props.link)}>{data[props.lang]["Texts"]["Projects"]["Card"]["Button"]}</button>

      <div className='card-footer'>
        <span className='footer-btn share-btn' onClick={handleShare}>
          <MdOutlineShare className='icon' />
        </span>
      </div>

      {showNotification && (
        <div className='copy-notification'>
          {data[props.lang]["Texts"]["Projects"]["Modal"]}
        </div>
      )}
    </div>
  );
}

export default Card;
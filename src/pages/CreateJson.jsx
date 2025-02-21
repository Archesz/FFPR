import React, { useState } from "react";
import infos from "../data/infos.json"; // Importe o JSON
import "../styles/create.scss";

const CreateJson = () => {
  // Extraia as opções do JSON
  const themes = Object.keys(infos["en"]["Themes"]); // Extrai as chaves do dicionário
  const types = Object.keys(infos["en"]["Types"]); // Extrai as chaves do dicionário
  const sources = Object.keys(infos["en"]["Sources"]); // Extrai as chaves do dicionário
  const regions = Object.keys(infos["en"]["Regions"]); // Extrai as chaves do dicionário

  const [formData, setFormData] = useState({
    title: "",
    tags: [],
    organization: "",
    author: "",
    year: "",
    language: "English",
    link: "",
    type: "report", // Use a chave em vez do valor
    source: "international_org", // Use a chave em vez do valor
    region: "europe", // Use a chave em vez do valor
    paid: "Free",
  });

  const languageOptions = ["English", "Portuguese", "Spanish", "French"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData((prev) => ({ ...prev, tags: selectedTags }));
  };

  const handleGenerateJSON = () => {
    const jsonOutput = {
      ...formData,
      author: formData.author.split(",").map((a) => a.trim()), // Converte string em array
    };

    const jsonString = JSON.stringify(jsonOutput, null, 2);

    navigator.clipboard
      .writeText(jsonString)
      .then(() => alert("JSON copiado para a área de transferência!"))
      .catch((err) => console.error("Erro ao copiar:", err));
  };

  return (
    <div className="create-container">
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />

      <label>Tags (Ctrl + Clique para selecionar múltiplos):</label>
      <select multiple onChange={handleTagsChange}>
        {themes.map((key) => (
          <option key={key} value={key}>
            {key} {/* Exibe o valor do dicionário */}
          </option>
        ))}
      </select>

      <label>Organization:</label>
      <input
        type="text"
        name="organization"
        value={formData.organization}
        onChange={handleChange}
      />

      <label>Author (separado por vírgula):</label>
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
      />

      <label>Year:</label>
      <input
        type="text"
        name="year"
        value={formData.year}
        onChange={handleChange}
      />

      <label>Language:</label>
      <select name="language" value={formData.language} onChange={handleChange}>
        {languageOptions.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      <label>Link:</label>
      <input
        type="text"
        name="link"
        value={formData.link}
        onChange={handleChange}
      />

      <label>Type:</label>
      <select name="type" value={formData.type} onChange={handleChange}>
        {types.map((key) => (
          <option key={key} value={key}>
            {infos["en"]["Types"][key]} {/* Exibe o valor do dicionário */}
          </option>
        ))}
      </select>

      <label>Source:</label>
      <select name="source" value={formData.source} onChange={handleChange}>
        {sources.map((key) => (
          <option key={key} value={key}>
            {infos["en"]["Sources"][key]} {/* Exibe o valor do dicionário */}
          </option>
        ))}
      </select>

      <label>Region:</label>
      <select name="region" value={formData.region} onChange={handleChange}>
        {regions.map((key) => (
          <option key={key} value={key}>
            {infos["en"]["Regions"][key]} {/* Exibe o valor do dicionário */}
          </option>
        ))}
      </select>

      <label>Paid:</label>
      <div>
        <input
          type="radio"
          name="paid"
          value="Free"
          checked={formData.paid === "Free"}
          onChange={handleChange}
        />
        Free
        <input
          type="radio"
          name="paid"
          value="Paywalled"
          checked={formData.paid === "Paywalled"}
          onChange={handleChange}
        />
        Paywalled
      </div>

      <button onClick={handleGenerateJSON} style={{ marginTop: "10px" }}>
        Gerar JSON
      </button>
    </div>
  );
};

export default CreateJson;
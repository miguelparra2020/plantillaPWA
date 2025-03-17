import React from "react";
import { useLanguage, Idioma } from "../Context/LanguageContext";

const LanguageSelector: React.FC = () => {
  const { idioma, setIdioma } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nuevoIdioma = e.target.value as Idioma;
    setIdioma(nuevoIdioma);
  };

  return (
    <select value={idioma} onChange={handleChange}>
      <option value="/en/">English</option>
      <option value="/es/">Español</option>
      <option value="/pt/">Português</option>
      <option value="/fr/">Français</option>
    </select>
  );
};

export default LanguageSelector;

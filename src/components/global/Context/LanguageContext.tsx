// Define el tipo para el idioma
export type Idioma = "/en/" | "/es/" | "/pt/" | "/fr/";

// Define la interfaz para el contexto
interface LanguageContextProps {
  idioma: Idioma;
  setIdioma: (nuevoIdioma: Idioma) => void;
}

import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

const LanguageContext = createContext<LanguageContextProps>({
  idioma: "/es/",
  setIdioma: () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [idioma, setIdiomaState] = useState<Idioma>("/es/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const almacenado = localStorage.getItem("idioma") as Idioma | null;
      if (almacenado) {
        setIdiomaState(almacenado);
      }
    }
  }, []);

  const setIdioma = (nuevoIdioma: Idioma) => {
    setIdiomaState(nuevoIdioma);
    if (typeof window !== "undefined") {
      localStorage.setItem("idioma", nuevoIdioma);
    }
  };

  return (
    <LanguageContext.Provider value={{ idioma, setIdioma }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

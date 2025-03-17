// TestLanguage.tsx
import React from "react"
import { useLanguage } from "../Context/LanguageContext"

const TestLanguage = () => {
  const { idioma } = useLanguage()
  return <p>El idioma actual es: {idioma}</p>
};

export default TestLanguage

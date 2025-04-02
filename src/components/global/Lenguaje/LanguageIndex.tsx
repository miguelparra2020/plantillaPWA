import React from "react"
import { FormSelectLanguage } from "./components/FormSelectLanguage"
import { InfoCurrentLanguaje } from "./components/InfoCurrentLanguaje"
const LanguageSelector: React.FC = () => {
  return (
    <>
    <InfoCurrentLanguaje/>
    <FormSelectLanguage />
    </>
  )
}

export default LanguageSelector

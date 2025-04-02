import React from "react"
import { useStore } from "@nanostores/react"
import { languajePage } from "src/stores/languajePage"
import { generalConfig } from "@util/generalConfig"

export const InfoCurrentLanguaje = () => {
    const { data: dataLanguaje, loading: loadingLanguaje, error: errorLenguaje } = useStore(languajePage)
    return (
        <div className="flex flex-col justify-center items-center w-full py-4">
        
        {loadingLanguaje ? <p>
            {dataLanguaje.languajeChoose === "/es/" ? generalConfig.GeneralWords.es.loading:null }
            {dataLanguaje.languajeChoose === "/en/" ? generalConfig.GeneralWords.en.loading:null }
            {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.GeneralWords.pt.loading:null }
            {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.GeneralWords.fr.loading:null }
        </p> : <h1 className="text-2xl">
        {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Language.es.currentLanguage: null }
        {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Language.en.currentLanguage: null }
        {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Language.pt.currentLanguage: null }
        {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Language.fr.currentLanguage: null }
            : &nbsp;
            {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Language.es.spanish: null }
            {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Language.en.english: null }
            {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Language.pt.portuguese: null }
            {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Language.fr.french: null }</h1>}
        {errorLenguaje ? <p>Error: {errorLenguaje}</p>:null}
        </div>
    )
}
import React from 'react'
import { useStore } from "@nanostores/react"
import { languajePage } from "src/stores/languajePage"
import { generalConfig } from "@util/generalConfig"
const TituloInicioBienvenida = () => {
    const { data: dataLanguaje} = useStore(languajePage)
    return (<>
    <h1 className={generalConfig.classTitlesGeneral}>
        {
        dataLanguaje.languajeChoose === "/es/" ? generalConfig.Home.Wellcome.Wellcome.es.titleWellcome :
        dataLanguaje.languajeChoose === "/en/" ? generalConfig.Home.Wellcome.Wellcome.en.titleWellcome :
        dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Home.Wellcome.Wellcome.pt.titleWellcome :
        dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Home.Wellcome.Wellcome.fr.titleWellcome : ""        
        } {generalConfig.Home.Wellcome.Company}
    </h1>
    </>)
}

export default TituloInicioBienvenida
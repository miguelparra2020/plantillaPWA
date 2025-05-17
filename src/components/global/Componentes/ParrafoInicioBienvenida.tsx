import React from 'react'
import { useStore } from "@nanostores/react"
import { languajePage } from "src/stores/languajePage"
import { generalConfig } from "@util/generalConfig"
const ParrafoInicioBienvenida = () => {
    const { data: dataLanguaje} = useStore(languajePage)
    return (<>
    <p className={generalConfig.classParagraphGeneral}>
        {
        dataLanguaje.languajeChoose === "/es/" ? generalConfig.Home.Wellcome.DescriptionWellcome.es.subtitleWellcome :
        dataLanguaje.languajeChoose === "/en/" ? generalConfig.Home.Wellcome.DescriptionWellcome.en.subtitleWellcome :
        dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Home.Wellcome.DescriptionWellcome.pt.subtitleWellcome :
        dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Home.Wellcome.DescriptionWellcome.fr.subtitleWellcome : ""
        }
    </p>
    </>)
}

export default ParrafoInicioBienvenida
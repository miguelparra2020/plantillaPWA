import React from "react"
import CardGeneral from "./CardGeneral"
import { StageProps } from "../interfaces/models"
import { useStore } from "@nanostores/react"
import { languajePage } from "src/stores/languajePage"
import { generalConfig } from "@util/generalConfig"
import Stage3Settings from "./stage3/Stage3Settings"
import { ButtonsHandleNextBackStage3 } from "./stage3/ButtonsHandleNextBackStage3"
import { useScrollToTop } from "src/hooks/useScrollToTop"

const Stage3: React.FC<StageProps> = ({ totalStages, currentStage, handleNext, handlePrev }) => {
  const { data: dataLanguaje} = useStore(languajePage)
  const progressPorcent = Math.floor((currentStage / totalStages) * 100)
  useScrollToTop()
  return (
    <CardGeneral 
      title={`${currentStage} -  
        ${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.titleStage3:""}
        ${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.titleStage3:""}
        ${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.titleStage3:""}
        ${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.titleStage3:""}`} 
      subtitle={`  
        ${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.subtitleStage3:""}
        ${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.subtitleStage3:""}
        ${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.subtitleStage3:""}
        ${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.subtitleStage3:""}`} 
      progress={progressPorcent} 
      children={<div><Stage3Settings/><ButtonsHandleNextBackStage3 handleNext={handleNext} handlePrev={handlePrev}/></div>}
    />
  )
}

export default Stage3
import React from "react"
import CardGeneral from "./CardGeneral"
import { StageProps } from "../interfaces/models"
import { useStore } from "@nanostores/react"
import { languajePage } from "src/stores/languajePage"
import {ButtonsHandleNextBackStage2} from "./stage2/ButtonsHandleNextBackStage2"
import { generalConfig } from "@util/generalConfig"
import Stage2Settings from "./stage2/Stage2Settings"

const Stage2: React.FC<StageProps> = ({ totalStages, currentStage, handleNext, handlePrev }) => {
  const progressPorcent = Math.floor((currentStage / totalStages) * 100)
  const { data: dataLanguaje} = useStore(languajePage)

  return (
    <CardGeneral 
      title={`${currentStage} - 
        ${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.titleStage2:""}
        ${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.titleStage2:""}
        ${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.titleStage2:""}
        ${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.titleStage2:""}`} 
      subtitle={`
        ${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.subtitleStage2:""}
        ${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.subtitleStage2:""}
        ${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.subtitleStage2:""}
        ${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.subtitleStage2:""}`} 
      progress={progressPorcent} 
      children={<div><Stage2Settings/><ButtonsHandleNextBackStage2 handleNext={handleNext} handlePrev={handlePrev}/></div>}
    />
  )
}

export default Stage2
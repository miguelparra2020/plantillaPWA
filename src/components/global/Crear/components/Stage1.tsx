import React from 'react'
import { StageProps } from '../interfaces/models'
import CardGeneral from './CardGeneral'
import { Stage1Settings } from './stage1/Stage1Settings'
import { ButtonHandleNextStage1 } from './stage1/ButtonHandleNextStage1'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { generalConfig } from "@util/generalConfig"

const Stage1: React.FC<StageProps> = ({ totalStages, currentStage, handleNext }) => {
  const progressPorcent = Math.floor((currentStage / totalStages) * 100)
  const { data: dataLanguaje} = useStore(languajePage)
  return (
    <>
      <CardGeneral
        title={`${currentStage} - 
  ${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.titleStage1:""}
  ${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.titleStage1:""}
  ${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.titleStage1:""}
  ${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.titleStage1:""}`}
        subtitle={`
  ${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.subtitleStage1:""}
  ${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.subtitleStage1:""}
  ${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.subtitleStage1:""}
  ${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.subtitleStage1:""}`}
        progress={progressPorcent}
        children={<div><Stage1Settings /> <ButtonHandleNextStage1 handleNext={handleNext}/></div>}
      />
      
    </>
  )
}

export default Stage1

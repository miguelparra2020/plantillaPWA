import React from 'react'
import { StageProps } from '../interfaces/models'
import CardGeneral from './CardGeneral'
import { Stage1Settings } from './stage1/Stage1Settings'
import { ButtonHandleNextStage1 } from './stage1/ButtonHandleNextStage1'

const Stage1: React.FC<StageProps> = ({ totalStages, currentStage, handleNext }) => {
  const progressPorcent = Math.floor((currentStage / totalStages) * 100)

  return (
    <>
      <CardGeneral
        title={`${currentStage} - Bienvenido a la creación del comercio electrónico`}
        subtitle={'Comienza tu viaje hacia el éxito digital en minutos'}
        progress={progressPorcent}
        children={<div><Stage1Settings /> <ButtonHandleNextStage1 handleNext={handleNext}/></div>}
      />
      
    </>
  )
}

export default Stage1

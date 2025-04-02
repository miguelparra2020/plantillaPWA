import React, { useState, useEffect } from 'react'
import { Stage1, Stage2, Stage3, Stage4, Stage5} from '@globals'
import Stage6 from './components/Stage6'

import { PreviewProyect } from './components/PreviewProyect'
import { ButtonHandlePreviewProyect } from './components/components/ButtonHandlePreviewProyect'
import { ContextosGlobales } from '../Context/ContextosGlobales'


const Crear = () => {
  const [showPreview, setShowPreview] = useState(false)
  const [currentStage, setCurrentStage] = useState(() => {
    const savedStage = localStorage.getItem('currentStage')
    return savedStage ? parseInt(savedStage) : 1
  })

  useEffect(() => {
    localStorage.setItem('currentStage', currentStage.toString())
  }, [currentStage])

  const handleNext = () => {
    setCurrentStage((prev) => {
      const newStage = prev + 1
      localStorage.setItem('currentStage', newStage.toString())
      return newStage
    })
  }

  const handlePrev = () => {
    setCurrentStage((prev) => {
      const newStage = prev - 1
      localStorage.setItem('currentStage', newStage.toString())
      return newStage
    })
  }

  const TotalStages = 6

  const renderStage = () => {
    switch (currentStage) {
      case 1:
        return <Stage1 totalStages={TotalStages} currentStage={currentStage} handleNext={handleNext} handlePrev={handlePrev}/>
      case 2:
        return <Stage2 totalStages={TotalStages} currentStage={currentStage} handleNext={handleNext} handlePrev={handlePrev}/>
      case 3:
        return <Stage3 totalStages={TotalStages} currentStage={currentStage} handleNext={handleNext} handlePrev={handlePrev}/>
      case 4:
        return <Stage4 totalStages={TotalStages} currentStage={currentStage} handleNext={handleNext} handlePrev={handlePrev}/>
      case 5:
        return <Stage5 totalStages={TotalStages} currentStage={currentStage} handleNext={handleNext} handlePrev={handlePrev}/>
      case 6:
          return <Stage6 totalStages={TotalStages} currentStage={currentStage} handleNext={handleNext} handlePrev={handlePrev}/>
      default:
        return <Stage1 totalStages={TotalStages} currentStage={currentStage} handleNext={handleNext} handlePrev={handlePrev}/>
    }
  }

  const renderPreviewProyect = () => {
    return <PreviewProyect />
  }

  return (
    <ContextosGlobales>
      <div className="flex justify-center items-center flex-col" >
        <ButtonHandlePreviewProyect showPreview={showPreview} setShowPreview={setShowPreview} />
        {showPreview ? renderPreviewProyect() : renderStage()}   
      </div>
      </ContextosGlobales>
  )
}

export default Crear
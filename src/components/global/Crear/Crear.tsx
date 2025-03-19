import React, { useState, useEffect } from 'react'
import { DivVertical, PaginateStages, Stage1, Stage2, Stage3, Stage4, Stage5} from '@globals'

const Crear = () => {
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

  const TotalStages = 5

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
      default:
        return <Stage1 totalStages={TotalStages} currentStage={currentStage} handleNext={handleNext} handlePrev={handlePrev}/>
    }
  }

  return (
    <div className="flex justify-center items-center flex-col" >
      {renderStage()}
      <br />
      <br />
      <br />
    </div>
  )
}

export default Crear
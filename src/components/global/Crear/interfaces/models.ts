export interface StageProps {
    totalStages: number
    currentStage: number
    handleNext?: () => void
    handlePrev?: () => void
  }


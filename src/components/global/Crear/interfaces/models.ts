export interface StageProps {
    totalStages: number
    currentStage: number
    handleNext?: () => void
    handlePrev?: () => void
  }

export interface ColorSettings {
  titleColor: string
  paragraphColor: string
}
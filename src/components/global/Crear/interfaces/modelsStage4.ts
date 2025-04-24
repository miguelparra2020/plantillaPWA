export type CustomizationStep =
  | "initial-question"
  | "edit-select-categories"
  | "areas-list"
  | "card-customization"
  | "intro-customization"
  | "product-card-customization"
  | "cards-inicio-web"
  | "product-detail-customization"
  | "cart-item-customization"
  | "complete"
  | "finaly-process"
  

export interface CardInicioSettings {
  showImage: boolean
  iconColor: string
  iconColorShade: number
}

export interface BusinessCategory {
  id: string
  title: string
  description: string
  includes: string[]
  examples: string[]
  categiryIsActive: boolean
  cardInicioSettings?: CardInicioSettings
}

export type RenderInitialQuestionComponentProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<CustomizationStep>>
  handlePrev: () => void
}
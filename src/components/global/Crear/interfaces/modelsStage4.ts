export type CustomizationStep =
  | "initial-question"
  | "edit-select-categories"
  | "areas-list"
  | "card-customization"
  | "intro-customization"
  | "product-card-customization"
  | "cards-inicio-web"
  | "cards-search-in-category"
  | "product-detail-customization"
  | "cart-item-customization"
  | "complete"
  | "finaly-process"
  

export interface CardInicioSettings {
  showImage: boolean
  icon: string
  title: string
  description: string
  textAlign: string
  rounded: string
  shadow: string
  hasBorder: boolean
  borderWidth: string
  borderColor: string
  borderShade: string
  titleColorCard: string
  titleColorShadeCard: number
  paragraphColorCard: string
  paragraphColorShadeCard: number
  titleSesionCardsInicio: string
  descriptionSesionCardsInicio: string
  nameButtonSesionCardsInicio: string
  quantityCardsSesionCardsInicio: number
  cardsDetailsSesionCardsInicio: Array<{
    cardTitle: string
    detailCard: string
    iconCard: string
    imageCard?: string
  }>
  cardsDetails: Array<{
    titleCardCardsInicio: string
  }>
}

export interface BusinessCategory {
  id: string
  title: string
  description: string
  includes: string[]
  examples: string[]
  categiryIsActive: boolean
  cardInicioSettings: CardInicioSettings
}

export type RenderInitialQuestionComponentProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<CustomizationStep>>
  handlePrev: () => void
}
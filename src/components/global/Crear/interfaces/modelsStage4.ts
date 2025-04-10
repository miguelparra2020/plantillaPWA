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
  

export interface BusinessCategory {
    id: string;
    title: string;
    description: string;
    includes: string[];
    examples: string[];
  }

  export type RenderInitialQuestionComponentProps = {
    setCurrentStep: React.Dispatch<React.SetStateAction<CustomizationStep>>
    handlePrev: () => void
  }
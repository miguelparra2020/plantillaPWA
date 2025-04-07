export type CustomizationStep =
  | "initial-question"
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
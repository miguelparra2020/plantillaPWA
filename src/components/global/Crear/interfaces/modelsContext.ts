// Definir interfaces para cada etapa
export interface Stage1Settings {
    storeName: string
    description: string
    language: string
  }

export interface Stage2Settings {
  titleColor: string
  paragraphColor: string
}

export interface Stage3Settings {
  backgroundColor: string
  buttonColor: string
  fontFamily: string
  bgColor: string
  bgShade: number
  rounded: string
  hasBorder: boolean
  borderColor: string
  borderShade: number
  borderWidth: string
  shadow: string
}

export interface cardSettings {
  titleColor: string
  paragraphColor: string
  hasBorder:   boolean
  borderColor: string
  borderShade: number
  borderWidth: string
  rounded:     string
  shadow:      string
  textAlign:   string
  title:       string
  description: string
  icon:        string
  showImage:   boolean
}

export interface settingsOperative {
  sellProducts: boolean | null
}

export interface IcardsDetails{
  titleCardCardsInicio: string
}

export interface cardsInicio {
  titleCardInicio: string 
  descriptionCardInicio: string
  quantityCards: number
  cardsDetails: IcardsDetails[]
}

export interface Stage4Settings {
    settingsOperative: settingsOperative
    cardSettings: cardSettings
    cardsInicio: cardsInicio
  }
  
export interface Stage5Settings {
    // Agrega aquí los campos específicos de Stage5
  }
  
export interface Stage6Settings {
    // Agrega aquí los campos específicos de Stage6
  }
  
  // Definir la interfaz principal que contiene todas las etapas
export interface CrearSettings {
    Stage1: Stage1Settings
    Stage2: Stage2Settings
    Stage3: Stage3Settings
    Stage4: Stage4Settings
    Stage5: Stage5Settings
    Stage6: Stage6Settings
  }
  
export interface CrearContextType {
    settings: CrearSettings
    setSettings: React.Dispatch<React.SetStateAction<CrearSettings>>
  }
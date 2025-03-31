import React, { createContext, useContext, useState } from 'react'
import { CrearContextType, CrearSettings, Stage2Settings } from '../interfaces/modelsContext'

const CrearContext = createContext<CrearContextType | null>(null)

export const CrearProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CrearSettings>({
    Stage1: {
      storeName: '',
      description: '',
      language: 'español'
    },
    Stage2: {
      titleColor: 'cyan',
      paragraphColor: 'slate',
    },
    Stage3: {
      backgroundColor: 'white',
      buttonColor: 'blue',
      fontFamily: 'Arial',
      bgColor: 'blue',
      bgShade: 500,
      rounded: 'rounded-md',
      hasBorder: false,
      borderColor: 'gray',
      borderShade: 500,
      borderWidth: 'border',
      shadow: 'shadow'
    },
    Stage4: {
      settingsOperative:{
        sellProducts: null
      },
      cardSettings: {
        titleColor: "cyan",
        paragraphColor: "slate",
        hasBorder: true,
        borderColor: "gray",
        borderShade: 500,
        borderWidth: "border",
        rounded: "rounded-xl",
        shadow: "shadow-md",
        textAlign: "text-left",
        title: "Nuestros Productos",
        description: "Descubra nuestra selección de productos de alta calidad diseñados para satisfacer sus necesidades.",
        icon: "shopping-cart",
        showImage: true,
      },
      cardsInicio:{
        titleCardInicio: "Descubre Nuestra Colección",
        descriptionCardInicio: "Explora una selección única de productos diseñados para ti.",
        nameButtonCardInicio: "Ver todos los productos",
        quantityCards: 1,
        cardsDetails: [{
          titleCardCardsInicio: "Ofertas"
        }]
      }
    },
    Stage5: {},
    Stage6: {}
  })

  return (
    <CrearContext.Provider value={{ settings, setSettings }}>
      {children}
    </CrearContext.Provider>
  )
}

export const useCrearContext = () => {
  const context = useContext(CrearContext)
  if (!context) {
    throw new Error('useCrearContext must be used within a CrearProvider')
  }
  return context
}
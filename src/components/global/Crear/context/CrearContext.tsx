import React, { createContext, useContext, useState } from 'react'
import { CrearContextType, CrearSettings } from '../interfaces/modelsContext'

const CrearContext = createContext<CrearContextType | null>(null)

export const CrearProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CrearSettings>({
    Stage1: {
      storeName: '',
      description: '',
      language: 'español'
    },
    Stage2: {
      // Inicializa los campos de Stage2
    },
    Stage3: {
      // Inicializa los campos de Stage3
    },
    Stage4: {
      // Inicializa los campos de Stage4
    },
    Stage5: {
      // Inicializa los campos de Stage5
    },
    Stage6: {
      // Inicializa los campos de Stage6
    }
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
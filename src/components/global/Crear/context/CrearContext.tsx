import React, { createContext, useContext, useState } from 'react'

interface EcommerceSettings {
  storeName: string
  description: string
  language: string
}

interface CrearContextType {
  settings: EcommerceSettings
  setSettings: React.Dispatch<React.SetStateAction<EcommerceSettings>>
}

const CrearContext = createContext<CrearContextType | null>(null)

export const CrearProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<EcommerceSettings>({
    storeName: '',
    description: '',
    language: 'español'
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

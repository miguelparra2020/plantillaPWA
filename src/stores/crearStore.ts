// src/stores/crearStore.ts
import { BusinessCategory } from '@component/global/Crear/interfaces/modelsStage4'
import { atom } from 'nanostores'

export interface InfoStage1 {
  nombreComercio: string
  descripcionActividad: string
  idiomaPlataforma: string
}

export interface InfoStage2 {
  colorTitles: string
  colorParagraph: string
  colorTitlesSave: string
  colorParagraphSave: string
  titleFont: string
  paragraphFont: string
  titleWeight: string
  paragraphWeight: string
  titleSize: string
  paragraphSize: string
  titleColorIntensity: string
  paragraphColorIntensity: string
}

export interface InfoStage3 {
  // Colores
  bgColor: string
  bgShade: number
  textColor: string
  textShade: number
  
  // Bordes
  rounded: string
  hasBorder: boolean
  borderColor: string
  borderShade: number
  borderWidth: string
  
  // Sombras
  shadow: string
  shadowColor: string
  shadowShade: number

  // Fuente
  buttonFont: string
  buttonWeight: string
  buttonSize: string

  // Al guardar
  bgButton: string
  bgButtonSave: string
}

export interface InfoStage4 {
  businessCategories?: BusinessCategory[]
  selectedCategories?: string[]
  categorySelectToEdit?: BusinessCategory | null
}

interface CrearState {
  data: string | null
  loading: boolean
  error: string | null
  infoStage1?: InfoStage1
  infoStage2?: InfoStage2
  infoStage3?: InfoStage3
  infoStage4?: InfoStage4
}

// Función para cargar el estado desde localStorage
const loadState = (): CrearState => {
  const savedState = localStorage.getItem('crearStore')
  return savedState ? JSON.parse(savedState) : { 
    data: null, 
    loading: false, 
    error: null,
    infoStage3: {
      bgColor: 'blue',
      bgShade: 500,
      textColor: 'white',
      textShade: 500,
      rounded: 'rounded',
      hasBorder: false,
      borderColor: 'blue',
      borderShade: 500,
      borderWidth: 'border',
      shadow: 'shadow',
      shadowColor: 'gray',
      shadowShade: 500,
      bgButton: '',
      bgButtonSave: '',
      buttonFont: '',
      buttonWeight: 'normal',
      buttonSize: 'medium',
    },
    infoStage4: {
      businessCategories: [],
      selectedCategories: []
    }
  }
}

// Crear el store con el estado inicial cargado desde localStorage
export const crearStore = atom<CrearState>(loadState())

// Función para guardar el estado en localStorage
const saveState = (state: CrearState) => {
  localStorage.setItem('crearStore', JSON.stringify(state))
}

// Escuchar cambios en el store y guardar el estado en localStorage
crearStore.listen((state) => {
  saveState(state)
})
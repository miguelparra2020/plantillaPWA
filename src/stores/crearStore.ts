// src/stores/crearStore.ts
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
  cardSettings: {
    showImage: boolean
    icon: string
    title: string
    description: string
    titleColor: string
    titleShade: number
    paragraphColor: string
    textAlign: string
    rounded: string
    shadow: string
    hasBorder: boolean
    borderWidth: string
    borderColor: string
    borderShade: string
  }
  cardsInicio: {
    titleCardInicio: string
    descriptionCardInicio: string
    nameButtonCardInicio: string
    quantityCards: number
    cardsDetails: Array<{
      titleCardCardsInicio: string
    }>
  }
  rounded: string
  bgColor: string
  bgShade: string
  shadow: string
  hasBorder: boolean
  borderWidth: string
  borderColor: string
  borderShade: string
  paragraphColor: string
}

export interface CardInicioSettings {
  showImage: boolean
  iconColor: string
  iconColorShade: number
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
  titleSesionCardsInicio: string
  descriptionSesionCardsInicio: string
  nameButtonSesionCardsInicio: string
  quantityCardsSesionCardsInicio: number
  cardsDetailsSesionCardsInicio: Array<{
    cardTitle: string
    detailCard: string
    iconCard: string
  }>
  cardsDetails: Array<{
    titleCardCardsInicio: string
  }>
}

export interface BusinessCategory {
  id: string
  title: string
  description: string
  cardInicioSettings: CardInicioSettings
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
      selectedCategories: [],
      categorySelectToEdit: null,
      cardSettings: {
        showImage: false,
        icon: 'star',
        title: 'Título de la card',
        description: 'Descripción de la card',
        titleColor: 'slate',
        titleShade: 500,
        paragraphColor: 'slate',
        textAlign: 'text-left',
        rounded: 'rounded',
        shadow: 'shadow',
        hasBorder: false,
        borderWidth: 'border',
        borderColor: 'slate',
        borderShade: '500'
      },
      cardsInicio: {
        titleCardInicio: '',
        descriptionCardInicio: '',
        nameButtonCardInicio: '',
        quantityCards: 0,
        cardsDetails: []
      },
      rounded: 'rounded',
      bgColor: 'blue',
      bgShade: '500',
      shadow: 'shadow',
      hasBorder: false,
      borderWidth: 'border',
      borderColor: 'blue',
      borderShade: '500',
      paragraphColor: 'white'
    }
  }
}

// Función para inicializar las propiedades de personalización de cards para una categoría
export const initializeCategoryCardSettings = (category: BusinessCategory): BusinessCategory => {
  return {
    ...category,
    cardInicioSettings: {
      showImage: false,
      iconColor: 'slate',
      iconColorShade: 500,
      icon: 'star',
      title: category.title || 'Título de la card',
      description: category.description || 'Descripción de la card',
      textAlign: 'text-left',
      rounded: 'rounded-lg',
      shadow: 'shadow-md',
      hasBorder: false,
      borderWidth: 'border',
      borderColor: 'slate',
      borderShade: '500',
      titleSesionCardsInicio: category.title || 'Título de la sesión de productos',
      descriptionSesionCardsInicio: category.description || 'Descripción de la sesión de productos',
      nameButtonSesionCardsInicio: 'Ver categoría',
      quantityCardsSesionCardsInicio: 0,
      cardsDetailsSesionCardsInicio: [],
      cardsDetails: []
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
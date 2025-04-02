// src/stores/crearStore.ts
import { atom } from 'nanostores'
import { generalConfig } from "@util/generalConfig"
interface dataLanguaje {
    languajeChoose: string
}

interface CrearState {
  data: dataLanguaje
  loading: boolean
  error: string | null
}

// Función para cargar el estado desde localStorage
const loadState = (): CrearState => {
  const savedState = localStorage.getItem('languajePage')
  return savedState ? JSON.parse(savedState) : { data: { languajeChoose: generalConfig.idioma }, loading: false, error: null }
}

// Crear el store con el estado inicial cargado desde localStorage
export const languajePage = atom<CrearState>(loadState())

// Función para guardar el estado en localStorage
const saveState = (state: CrearState) => {
  localStorage.setItem('languajePage', JSON.stringify(state))
}

// Escuchar cambios en el store y guardar el estado en localStorage
languajePage.listen((state) => {
  saveState(state)
})
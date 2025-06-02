// src/stores/ServicesScheduling.ts
import { atom } from 'nanostores'

export interface Servicio {
  id: string
  nombre: string
  descripcion: string
  precio: number
  duracion: number
  popular?: boolean
}

export interface Sede {
  id: string
  nombre: string
  descripcion: string
  direccion: string
  zona: string
  telefono: string
  destacada?: boolean
}

export interface Persona {
  id: string
  nombre: string
  cargo: string
  descripcion: string
  destacado?: boolean
  imagen: string
}

interface AgendamientoInfo {
  servicio: Servicio | null
  sede: Sede | null
  persona: Persona | null
  fecha?: string
  hora?: string
  comentarios?: string
}

interface ServicesSchedulingState {
  data: AgendamientoInfo
  loading: boolean
  error: string | null
}

// Función para cargar el estado desde localStorage
const loadState = (): ServicesSchedulingState => {
  if (typeof window === 'undefined') {
    return { data: { servicio: null, sede: null, persona: null }, loading: false, error: null }
  }
  
  const savedState = localStorage.getItem('servicioAgendado')
  return savedState ? JSON.parse(savedState) : { data: { servicio: null, sede: null, persona: null }, loading: false, error: null }
}

// Crear el store con el estado inicial cargado desde localStorage
export const servicioAgendadoStore = atom<ServicesSchedulingState>(loadState())

// Función para guardar el estado en localStorage
const saveState = (state: ServicesSchedulingState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('servicioAgendado', JSON.stringify(state))
  }
}

// Escuchar cambios en el store y guardar el estado en localStorage
servicioAgendadoStore.listen((state) => {
  saveState(state)
})

// Acciones para modificar el store

/**
 * Selecciona un servicio para agendar
 */
export const seleccionarServicio = (servicio: Servicio) => {
  servicioAgendadoStore.set({
    ...servicioAgendadoStore.get(),
    data: {
      ...servicioAgendadoStore.get().data,
      servicio
    }
  })
}

/**
 * Selecciona una sede para el agendamiento
 */
export const seleccionarSede = (sede: Sede) => {
  servicioAgendadoStore.set({
    ...servicioAgendadoStore.get(),
    data: {
      ...servicioAgendadoStore.get().data,
      sede
    }
  })
}

/**
 * Establece la fecha y hora del agendamiento
 */
export const establecerFechaHora = (fecha: string, hora: string) => {
  servicioAgendadoStore.set({
    ...servicioAgendadoStore.get(),
    data: {
      ...servicioAgendadoStore.get().data,
      fecha,
      hora
    }
  })
}

/**
 * Añade comentarios al agendamiento
 */
export const agregarComentarios = (comentarios: string) => {
  servicioAgendadoStore.set({
    ...servicioAgendadoStore.get(),
    data: {
      ...servicioAgendadoStore.get().data,
      comentarios
    }
  })
}

/**
 * Limpia la información del servicio agendado
 */
export const limpiarAgendamiento = () => {
  servicioAgendadoStore.set({
    data: { servicio: null, sede: null, persona: null },
    loading: false,
    error: null
  })
}

/**
 * Establece un estado de carga
 */
export const setLoading = (loading: boolean) => {
  servicioAgendadoStore.set({
    ...servicioAgendadoStore.get(),
    loading
  })
}

/**
 * Establece un mensaje de error
 */
export const setError = (error: string | null) => {
  servicioAgendadoStore.set({
    ...servicioAgendadoStore.get(),
    error
  })
}

/**
 * Selecciona una persona para el agendamiento
 */
export const seleccionarPersona = (persona: Persona) => {
  servicioAgendadoStore.set({
    ...servicioAgendadoStore.get(),
    data: {
      ...servicioAgendadoStore.get().data,
      persona
    }
  })
}

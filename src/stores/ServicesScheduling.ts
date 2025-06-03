// src/stores/ServicesScheduling.ts
import { Servicio } from '@component/global/interfaces/ServiciosAgendamientoCardsInterface'
import { atom } from 'nanostores'


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
  dayNotWork?: string // Día que no trabaja (ejemplo: 'lunes', 'martes', etc.)
  
  // Franjas horarias generales
  earlyMorning?: boolean // Trabaja en madrugada (12am-6am)
  inTheMorning?: boolean // Trabaja en la mañana (6am-12pm)
  inTheAfternoon?: boolean // Trabaja en la tarde (12pm-6pm)
  atNight?: boolean // Trabaja en la noche (6pm-12am)
  
  // Horarios detallados por hora - Madrugada (12am-6am)
  earlyMorning12am1am?: boolean // 12:00 AM - 1:00 AM
  earlyMorning1am2am?: boolean // 1:00 AM - 2:00 AM
  earlyMorning2am3am?: boolean // 2:00 AM - 3:00 AM
  earlyMorning3am4am?: boolean // 3:00 AM - 4:00 AM
  earlyMorning4am5am?: boolean // 4:00 AM - 5:00 AM
  earlyMorning5am6am?: boolean // 5:00 AM - 6:00 AM
  
  // Horarios detallados por hora - Mañana (6am-12pm)
  inTheMorning6am7am?: boolean // 6:00 AM - 7:00 AM
  inTheMorning7am8am?: boolean // 7:00 AM - 8:00 AM
  inTheMorning8am9am?: boolean // 8:00 AM - 9:00 AM
  inTheMorning9am10am?: boolean // 9:00 AM - 10:00 AM
  inTheMorning10am11am?: boolean // 10:00 AM - 11:00 AM
  inTheMorning11am12pm?: boolean // 11:00 AM - 12:00 PM
  
  // Horarios detallados por hora - Tarde (12pm-6pm)
  inTheAfternoon12pm1pm?: boolean // 12:00 PM - 1:00 PM
  inTheAfternoon1pm2pm?: boolean // 1:00 PM - 2:00 PM
  inTheAfternoon2pm3pm?: boolean // 2:00 PM - 3:00 PM
  inTheAfternoon3pm4pm?: boolean // 3:00 PM - 4:00 PM
  inTheAfternoon4pm5pm?: boolean // 4:00 PM - 5:00 PM
  inTheAfternoon5pm6pm?: boolean // 5:00 PM - 6:00 PM
  
  // Horarios detallados por hora - Noche (6pm-12am)
  atNight6pm7pm?: boolean // 6:00 PM - 7:00 PM
  atNight7pm8pm?: boolean // 7:00 PM - 8:00 PM
  atNight8pm9pm?: boolean // 8:00 PM - 9:00 PM
  atNight9pm10pm?: boolean // 9:00 PM - 10:00 PM
  atNight10pm11pm?: boolean // 10:00 PM - 11:00 PM
  atNight11pm12am?: boolean // 11:00 PM - 12:00 AM
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

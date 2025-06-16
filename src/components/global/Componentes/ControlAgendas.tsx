

import React, { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { servicioAgendadoStore } from '../../../stores/ServicesScheduling'
import { useStore } from '@nanostores/react'
import { Calendar, Clock, ArrowRight, Calendar as CalendarIcon, Trash2, X, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Tipo para los eventos del calendario
type CalendarEvent = {
  id: string
  start: {
    dateTime: string
  }
  end: {
    dateTime: string
  }
  summary: string
  description?: string
  location?: string
  attendees?: Array<{
    email: string
    displayName?: string
  }>
  // Campos adicionales para manejo de UI
  calendarId?: string
  calendarName?: string
}

// Tipo para la respuesta paginada
type CalendarResponse = {
  events: CalendarEvent[]
  nextPageToken?: string
  calendarId: string
}

// Definir los IDs de calendario disponibles
const CALENDAR_IDS = [
  { id: "8c7ab21ba8a0d96b02f493d0b58abaa286f9af12db4366f4356baf8ad30d208f@group.calendar.google.com", name: "Agenda con Oscar Rodriguez" },
  {
    id: "5d9a781b707c3da4ea852b317eb62c6204f1eb538e0dbb4bec0bb2de7d650a1c@group.calendar.google.com",
    name: "Agenda con Daniel Cano"
  }
]

// Tipos para el filtro de fecha
type DateFilterType = 'today' | 'week' | 'month' | 'year'

const ControlAgendas = () => {
  const servicioAgendado = useStore(servicioAgendadoStore)
  const [currentYear] = useState(new Date().getFullYear())
  const [user, setUser] = useState<any>(null)
  const [dateFilter, setDateFilter] = useState<DateFilterType>('today')
  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null)
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({})
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  // Estado para los calendarios seleccionados
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>(CALENDAR_IDS.map(cal => cal.id))

  // Cargar usuario de localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("googleUser")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Error al cargar usuario:", error)
    }
  }, [])
  
  // Calcular fechas de inicio y fin según el filtro seleccionado
  const getDateRange = () => {
    const now = new Date()
    let start: Date
    let end: Date = new Date(now)
    end.setHours(23, 59, 59, 999)

    switch (dateFilter) {
      case 'today':
        start = new Date(now)
        start.setHours(0, 0, 0, 0)
        break
      case 'week':
        start = new Date(now)
        start.setDate(now.getDate() - now.getDay()) // Inicio de la semana (domingo)
        start.setHours(0, 0, 0, 0)
        end = new Date(start)
        end.setDate(start.getDate() + 6) // Fin de la semana (sábado)
        end.setHours(23, 59, 59, 999)
        break
      case 'month':
        start = new Date(now.getFullYear(), now.getMonth(), 1)
        start.setHours(0, 0, 0, 0)
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        end.setHours(23, 59, 59, 999)
        break
      case 'year':
        start = new Date(now.getFullYear(), 0, 1)
        start.setHours(0, 0, 0, 0)
        end = new Date(now.getFullYear(), 11, 31)
        end.setHours(23, 59, 59, 999)
        break
      default:
        start = new Date(now)
        start.setHours(0, 0, 0, 0)
    }
    
    return {
      startDate: start.toISOString(),
      endDate: end.toISOString()
    }
  }
  
  // Fechas de inicio y fin según el filtro seleccionado
  const { startDate, endDate } = getDateRange()

  // Función para cargar eventos de un calendario
  const fetchCalendarEvents = async ({ pageParam = 0 }) => {
    // Filtrar los calendarios seleccionados
    const filteredCalendars = CALENDAR_IDS.filter(cal => selectedCalendars.includes(cal.id))
    
    // El índice del calendario actual dentro de los seleccionados
    const calendarIndex = pageParam
    
    if (calendarIndex >= filteredCalendars.length) {
      // Hemos consultado todos los calendarios seleccionados
      return null
    }
    
    const calendarId = filteredCalendars[calendarIndex].id
    
    try {
      const response = await axios.get(`https://mi-express-app.vercel.app/api/calendar/events`, {
        params: {
          calendarId,
          periodStart: startDate,
          periodEnd: endDate
        }
      })

      return {
        ...response.data,
        calendarId,
        calendarName: filteredCalendars[calendarIndex].name,
        nextPage: calendarIndex + 1
      }
    } catch (error) {
      console.error(`Error al cargar eventos del calendario ${calendarId}:`, error)
      // En caso de error en un calendario, intentamos con el siguiente
      return {
        events: [],
        calendarId,
        calendarName: filteredCalendars[calendarIndex].name,
        nextPage: calendarIndex + 1
      }
    }
  }

  // Configuración de la infinity query
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch
  } = useInfiniteQuery({
    queryKey: ['calendarEvents', startDate, endDate, selectedCalendars],
    queryFn: fetchCalendarEvents,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined
      const filteredCalendars = CALENDAR_IDS.filter(cal => selectedCalendars.includes(cal.id))
      return lastPage.nextPage < filteredCalendars.length ? lastPage.nextPage : undefined
    },
    initialPageParam: 0
  })

  // Cargar automáticamente el siguiente calendario hasta que hayamos cargado todos
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  // Formatear fecha y hora para mostrar
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return {
      date: date.toLocaleDateString('es-ES', options),
      time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
  }
  
  // Extraer solo la hora:minuto:segundo de una cadena ISO 8601
  const extractTimeOnly = (isoString: string) => {
    if (!isoString) return ''
    // Buscar la parte entre la T y el +
    const matches = isoString.match(/T([^+]+)/)
    return matches && matches[1] ? matches[1] : ''
  }
  
  // Manejar la eliminación de un evento
  const handleDeleteEvent = (event: CalendarEvent) => {
    setEventToDelete(event)
  }
  
  // Confirmar la eliminación del evento
  const confirmDeleteEvent = async () => {
    if (eventToDelete) {
      try {
        setIsDeleting(true)
        setDeleteError(null)
        
        // Buscar el calendario correspondiente al evento
        const calendarInfo = eventToDelete.calendarName ? 
          CALENDAR_IDS.find(calendar => calendar.name === eventToDelete.calendarName) : null
          
        if (!calendarInfo) {
          throw new Error('No se encontró información del calendario')
        }
        
        // Construir la URL para la eliminación del evento
        const deleteUrl = `https://mi-express-app.vercel.app/api/calendar/appointments/${eventToDelete.id}?calendarId=${encodeURIComponent(calendarInfo.id)}`
        
        console.log('Eliminando evento con URL:', deleteUrl)
        
        // Realizar la solicitud DELETE
        const response = await axios.delete(deleteUrl)
        
        console.log('Respuesta de eliminación:', response.data)
        
        // Refrescar los datos
        await refetch()
        
        // Mostrar mensaje de éxito
        toast.success('Cita cancelada exitosamente')
      } catch (error: any) {
        console.error('Error al eliminar el evento:', error)
        setDeleteError(error.message || 'Ocurrió un error al cancelar la cita. Intente nuevamente.')
        
        // Mostrar mensaje de error
        toast.error('Error al cancelar la cita: ' + (error.message || 'Intente nuevamente.'))
      } finally {
        setIsDeleting(false)
        setEventToDelete(null)
      }
    }
  }
  
  // Cancelar la eliminación
  const cancelDeleteEvent = () => {
    setEventToDelete(null)
  }

  // Manejar el cambio de selección de calendarios
  const handleCalendarChange = (calendarId: string) => {
    setSelectedCalendars(prev => {
      if (prev.includes(calendarId)) {
        return prev.filter(id => id !== calendarId)
      } else {
        return [...prev, calendarId]
      }
    })
  }

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-slate-500 rounded-full"></div>
          <div className="h-3 w-3 bg-slate-500 rounded-full"></div>
          <div className="h-3 w-3 bg-slate-500 rounded-full"></div>
        </div>
        <span className="ml-3 text-gray-600">Cargando calendarios...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-red-700">Error al cargar los eventos: {error instanceof Error ? error.message : 'Error desconocido'}</p>
      </div>
    )
  }

  // Extraer todos los eventos de todas las páginas cargadas
  const allEvents = data?.pages
    .filter(Boolean) // Filtrar páginas nulas
    .flatMap(page => 
      (page.events || []).map(event => ({
        ...event,
        calendarId: page.calendarId,
        calendarName: page.calendarName
      }))
    ) || []


  // Ordenar eventos por fecha de inicio
  const sortedEvents = [...allEvents].sort((a, b) => 
    new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime()
  )

  // Contador de citas según el filtro seleccionado
  const eventCount = sortedEvents.length
  
  // Filtros disponibles con sus etiquetas en español
  const dateFilters: { id: DateFilterType; label: string }[] = [
    { id: 'today', label: 'Hoy' },
    { id: 'week', label: 'Semana' },
    { id: 'month', label: 'Mes' },
    { id: 'year', label: 'Año' }
  ]

  return (
    <div className="space-y-4 relative z-20">
      {/* Contenedor de notificaciones */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ pointerEvents: 'none' }}>
        <div className="mx-auto max-w-screen-md pt-24">
          <ToastContainer 
            position="top-center"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            style={{ position: 'relative', top: '0', left: '0', margin: '0 auto', pointerEvents: 'auto' }}
          />
        </div>
      </div>
      {/* Modal de confirmación para eliminar */}
      {eventToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-red-600">
                <AlertCircle className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-medium">Cancelar Cita</h3>
              </div>
              <button
                onClick={cancelDeleteEvent}
                className="bg-white rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            {deleteError && (
              <div className="p-3 mb-4 bg-red-50 text-red-700 border border-red-200 rounded">
                <p>{deleteError}</p>
              </div>
            )}
            
            <p className="mb-4 text-gray-700">
              ¿Está seguro de que desea cancelar la cita "{eventToDelete.summary}"?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={cancelDeleteEvent}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center justify-center min-w-[150px]"
                onClick={confirmDeleteEvent}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                    Procesando...
                  </>
                ) : 'Sí, cancelar cita'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Eventos Agendados</h2>
        <span className="bg-slate-100 text-slate-800 text-xs font-medium px-3 py-1 rounded-full">
          {eventCount} {eventCount === 1 ? 'cita' : 'citas'}
        </span>
      </div>
      
      {/* Filtros */}
      <div className="mb-4 space-y-4">
        {/* Filtro de calendarios */}
        <div className="bg-white rounded-lg px-4 py-3 border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-2">Filtrar por calendario:</h3>
          <div className="flex flex-wrap gap-2">
            {CALENDAR_IDS.map(calendar => (
              <div key={calendar.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`calendar-${calendar.id}`}
                  checked={selectedCalendars.includes(calendar.id)}
                  onChange={() => handleCalendarChange(calendar.id)}
                  className="mr-2 h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor={`calendar-${calendar.id}`} className="text-gray-700">
                  {calendar.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Filtro de fechas */}
        <div className="bg-gray-100 p-1 rounded-lg shadow-sm">
          {dateFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setDateFilter(filter.id)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${dateFilter === filter.id 
                ? 'bg-white shadow-sm text-slate-600' 
                : 'text-gray-600 hover:bg-gray-200'}`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      
      {allEvents.length === 0 ? (
        <div className="bg-gray-50 p-4 rounded-md text-center">
          <p className="text-gray-500">No hay eventos agendados para mostrar</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedEvents.map(event => {
            const { date, time: startTime } = formatDateTime(event.start.dateTime)
            const { time: endTime } = formatDateTime(event.end.dateTime)
            
            return (
              <div key={event.id} className="bg-white border rounded-lg p-5 shadow-sm relative z-30">
                {/* Indicador de estado */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                    Confirmado
                  </span>
                  <button 
                    onClick={() => handleDeleteEvent(event)}
                    className="text-red-500 hover:text-red-700"
                    title="Cancelar cita"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                
                {/* Información principal de la cita */}
                <div className="space-y-4">
                  {/* Nombre del paciente */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <span className="text-lg font-medium">{event.organizer.displayName}</span>
                  </div>

                  {/* Fecha */}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <span className="text-lg">{date}</span>
                  </div>
                  
                  {/* Horario */}
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <span className="text-lg">{extractTimeOnly(event.start.dateTime)} - {extractTimeOnly(event.end.dateTime)}</span>
                  </div>
                </div>
                
                {/* Detalles desplegables */}
                <div className="mt-4">
                  <button 
                    onClick={() => {
                      setExpandedDescriptions(prev => ({
                        ...prev,
                        [event.id]: !prev[event.id]
                      }))
                    }}
                    className="flex w-full justify-between items-center py-2 text-gray-700 font-medium focus:outline-none border-t border-gray-100 pt-3"
                  >
                    <span>Detalles del servicio</span>
                    {expandedDescriptions[event.id] ? 
                      <ChevronUp className="w-5 h-5" /> : 
                      <ChevronDown className="w-5 h-5" />
                    }
                  </button>
                  {expandedDescriptions[event.id] && (
                    <div className="p-4 text-gray-700 bg-gray-50 rounded-md mt-2">
                      <div className="space-y-3">
                        {/* Nombre del servicio */}
                        <div>
                          <div className="font-medium mb-1">Servicio:</div>
                          <div>{event.description ? event.description.split('\n')[0] : 'No disponible'}</div>
                        </div>
                        
                        {/* ID y Duración */}
                        <div className="flex justify-between">
                          <div>
                            <span className="font-medium">ID:</span> {event.id.substring(0, 8)}...
                          </div>
                          <div>
                            <span className="font-medium">Duración:</span> {Math.round((new Date(event.end.dateTime).getTime() - new Date(event.start.dateTime).getTime()) / 60000)}min
                          </div>
                        </div>
                        
                        {/* Email */}
                        {event.attendees && event.attendees.length > 0 && (
                          <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>{event.attendees[0].email}</span>
                          </div>
                        )}
                        
                        {/* Información adicional si existe */}
                        {event.location && (
                          <div className="mt-2">
                            <span className="font-medium">Ubicación:</span> {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
      
      {isFetchingNextPage && (
        <div className="text-center p-2">
          <span className="text-sm text-gray-500">Cargando más calendarios...</span>
        </div>
      )}
    </div>
  )
}

export default ControlAgendas
import React, { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { servicioAgendadoStore } from '../../../stores/ServicesScheduling'
import { useStore } from '@nanostores/react'
import { Calendar, Clock, ArrowRight, Calendar as CalendarIcon, Trash2, X, AlertCircle } from 'lucide-react'

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
  // otros campos según la respuesta real de la API
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

const UserCalendarioConAgendamiento = () => {
  const servicioAgendado = useStore(servicioAgendadoStore)
  const [currentYear] = useState(new Date().getFullYear())
  const [user, setUser] = useState<any>(null)
  const [dateFilter, setDateFilter] = useState<DateFilterType>('today')
  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null)

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
    // El índice del calendario actual
    const calendarIndex = pageParam
    
    if (calendarIndex >= CALENDAR_IDS.length) {
      // Hemos consultado todos los calendarios disponibles
      return null
    }
    
    const calendarId = CALENDAR_IDS[calendarIndex].id
    
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
        calendarName: CALENDAR_IDS[calendarIndex].name,
        nextPage: calendarIndex + 1
      }
    } catch (error) {
      console.error(`Error al cargar eventos del calendario ${calendarId}:`, error)
      // En caso de error en un calendario, intentamos con el siguiente
      return {
        events: [],
        calendarId,
        calendarName: CALENDAR_IDS[calendarIndex].name,
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
    error
  } = useInfiniteQuery({
    queryKey: ['calendarEvents', startDate, endDate],
    queryFn: fetchCalendarEvents,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined
      return lastPage.nextPage < CALENDAR_IDS.length ? lastPage.nextPage : undefined
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
    return {
      date: date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
  }
  
  // Manejar la eliminación de un evento
  const handleDeleteEvent = (event: CalendarEvent) => {
    setEventToDelete(event)
  }
  
  // Confirmar la eliminación del evento
  const confirmDeleteEvent = () => {
    if (eventToDelete) {
      console.log('Evento a eliminar:', eventToDelete)
      // Aquí se implementaría la llamada a la API para eliminar el evento
      // Por ahora solo hacemos console.log como solicitado
      setEventToDelete(null)
    }
  }
  
  // Cancelar la eliminación
  const cancelDeleteEvent = () => {
    setEventToDelete(null)
  }

  if (isLoading && !data) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-pulse flex space-x-2">
          <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
          <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
          <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
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

  // Filtrar eventos donde el summary coincide con el email del usuario
  const filteredEvents = user && user.email 
    ? allEvents.filter(event => event.summary.includes(user.email))
    : allEvents

  // Ordenar eventos por fecha de inicio
  const sortedEvents = [...filteredEvents].sort((a, b) => 
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
      {/* Modal de confirmación para eliminar */}
      {eventToDelete && (
        <div className="mx-4 fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-start mb-4">
              <div className="mr-3 bg-red-100 p-2 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Confirmar cancelación</h3>
                <p className="mt-1 text-sm text-gray-500">
                  ¿Estás seguro que deseas cancelar la cita de "{eventToDelete.summary}"? Esta acción no se puede deshacer.
                </p>
              </div>
              <button
                className="ml-auto bg-white rounded-full p-1 hover:bg-gray-100"
                onClick={cancelDeleteEvent}
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={cancelDeleteEvent}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                onClick={confirmDeleteEvent}
              >
                Sí, cancelar cita
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Mis Eventos Agendados</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
          {eventCount} {eventCount === 1 ? 'cita' : 'citas'}
        </span>
      </div>
      
      {/* Filtros de fecha */}
      <div className="flex mb-4 bg-gray-100 p-1 rounded-lg shadow-sm">
        {dateFilters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setDateFilter(filter.id)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${dateFilter === filter.id 
              ? 'bg-white shadow-sm text-blue-600' 
              : 'text-gray-600 hover:bg-gray-200'}`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {sortedEvents.length === 0 ? (
        <div className="bg-gray-50 p-4 rounded-md text-center">
          <p className="text-gray-500">No hay eventos agendados para mostrar</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedEvents.map(event => {
            const { date, time: startTime } = formatDateTime(event.start.dateTime)
            const { time: endTime } = formatDateTime(event.end.dateTime)
            
            return (
              <div key={event.id} className="bg-white border rounded-md p-4 shadow-sm relative z-30">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <h3 className="font-medium text-gray-800">{event.summary}</h3>
                    <span className="mt-2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded inline-block">
                      {event.calendarName}
                    </span>
                  </div>
                  
                </div>
                
                {event.description && (
                  <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                )}
                
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{date}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{startTime}</span>
                  <ArrowRight className="w-3 h-3 mx-1" />
                  <span>{endTime}</span>
                </div>
                
                {event.location && (
                  <p className="mt-2 text-xs text-gray-500">
                    Ubicación: {event.location}
                  </p>
                )}
                <div className='flex flex-row items-end justify-end gap-2'>
                <button 
                    onClick={() => handleDeleteEvent(event)}
                    className="flex flex-row items-center gap-1 px-4 right-2 text-red-600 py-2 mt-2 rounded-full bg-red-50 transition-colors"
                    title="Cancelar cita"
                  >
                   Cancelar cita <Trash2 size={18} />
                  </button>
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

export default UserCalendarioConAgendamiento
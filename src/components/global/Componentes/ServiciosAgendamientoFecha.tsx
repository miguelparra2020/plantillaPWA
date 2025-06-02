import React, { useState, useEffect } from 'react'
import { servicioAgendadoStore, establecerFechaHora } from '../../../stores/ServicesScheduling'
import { generalConfig } from '@util/generalConfig'
import { ToastContainer } from 'react-toastify'

interface DateOption {
  date: Date
  available: boolean
  slots?: number
}

const DAYS_OF_WEEK = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"]
const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]

const ServiciosAgendamientoFecha = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  const [storeState, setStoreState] = useState(servicioAgendadoStore.get())

  // Suscribirse a cambios en el store
  useEffect(() => {
    const unsubscribe = servicioAgendadoStore.listen(state => {
      setStoreState(state)
      // Si ya hay una fecha en el store, seleccionarla
      if (state.data.fecha) {
        try {
          setSelectedDate(new Date(state.data.fecha))
        } catch (e) {
          console.error('Error al parsear la fecha', e)
        }
      }
    })
    
    return () => unsubscribe()
  }, [])

  // Generar fechas de muestra para la semana actual
  const generateWeekDates = (startDate: Date): DateOption[] => {
    const dates: DateOption[] = []
    // Ajustar startDate para que comience en domingo (o el primer día de la semana)
    const adjustedStart = new Date(startDate)
    adjustedStart.setDate(startDate.getDate() - startDate.getDay())
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(adjustedStart)
      date.setDate(adjustedStart.getDate() + i)
      dates.push({
        date,
        available: Math.random() > 0.3, // Disponibilidad aleatoria
        slots: Math.floor(Math.random() * 5) + 1,
      })
    }
    return dates
  }

  const [weekDates, setWeekDates] = useState(generateWeekDates(currentWeekStart))

  const navigateWeek = (direction: "prev" | "next") => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(currentWeekStart.getDate() + (direction === "next" ? 5 : -5))
    setCurrentWeekStart(newStart)
    setWeekDates(generateWeekDates(newStart))
  }

  const formatDate = (date: Date) => {
    return {
      month: MONTHS[date.getMonth()],
      day: date.getDate().toString().padStart(2, "0"),
      dayOfWeek: DAYS_OF_WEEK[date.getDay()],
    }
  }

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString()
  }

  const handleDateSelect = (date: Date, available: boolean) => {
    if (!available) return
    
    setSelectedDate(date)
    const formattedDate = date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    // Actualizar el store con la fecha seleccionada
    // Dejamos la hora vacía por ahora, se llenará en otro componente
    establecerFechaHora(formattedDate, '')
  }

  const handleContinuar = () => {
    // Aquí se podría implementar la navegación al siguiente paso
    console.log('Continuar con la reserva')
  }

  return (
    <div className="w-full mx-auto space-y-6">
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
      {/* Título del componente */}
      <div className="w-full mt-2 flex flex-col justify-center items-center text-center gap-2">
        <h1 className={generalConfig.classTitlesGeneral}>
        Selección de Fecha
        </h1>
        <p className={generalConfig.classParagraphGeneral}>
          Escoge la fecha en la que deseas agendar tu servicio
        </p>
      </div>
      <br />
      <div className='flex justify-center items-center'>
        <div className='max-w-lg'>
      {/* Date Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => navigateWeek("prev")} 
          className="px-3 py-1 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </button>

        <div className="text-sm font-medium text-gray-600">
          {formatDate(currentWeekStart).month} {currentWeekStart.getFullYear()}
        </div>

        <button 
          onClick={() => navigateWeek("next")} 
          className="px-3 py-1 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
        >
          Siguiente
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-5 gap-3">
        {weekDates.map((dateOption, index) => {
          const { month, day, dayOfWeek } = formatDate(dateOption.date)
          const selected = isSelected(dateOption.date)

          return (
            <div
              key={index}
              className={`
                border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md
                ${selected
                  ? "ring-2 ring-primary bg-primary text-primary-foreground"
                  : dateOption.available
                    ? "hover:bg-gray-50 border-gray-200"
                    : "opacity-50 cursor-not-allowed bg-gray-50"
                }
              `}
              onClick={() => handleDateSelect(dateOption.date, dateOption.available)}
            >
              <div className="p-4 text-center space-y-2">
                <div className="text-xs font-medium opacity-80">{month}</div>
                <div className="text-2xl font-bold">{day}</div>
                <div className="text-xs font-medium">{dayOfWeek}</div>
              </div>
            </div>
          )
        })}
      </div>
        </div>
      </div>
      {/* Selected Date Info */}
      {selectedDate && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-primary">Fecha seleccionada</h3>
                <p className="text-sm text-gray-600">
                  {selectedDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <button 
                onClick={handleContinuar}
                className="ml-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Continuar con la reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiciosAgendamientoFecha
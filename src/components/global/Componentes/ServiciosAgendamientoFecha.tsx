import React, { useState, useEffect } from 'react'
import { servicioAgendadoStore, establecerFechaHora } from '../../../stores/ServicesScheduling'
import { generalConfig } from '@util/generalConfig'
import { ToastContainer } from 'react-toastify'
import { ServicioAgendadoInfo } from '@globals'
import TimeScheduler from './TimeScheduler'

interface DateOption {
  date: Date
  available: boolean
  slots?: number
}

const DAYS_OF_WEEK = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"]
const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]

const ServiciosAgendamientoFecha = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  // Usamos la fecha actual como punto de inicio
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  
  // Referencia a la fecha actual y la fecha límite (30 días hacia adelante)
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Resetear horas para comparaciones precisas
  
  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + 30) // Límite de 30 días hacia adelante
  const [storeState, setStoreState] = useState(servicioAgendadoStore.get())

  // Efecto que se ejecuta al montar el componente para reiniciar fecha y hora
  useEffect(() => {
    // Resetear la fecha seleccionada al montar el componente
    setSelectedDate(null)
    establecerFechaHora('', '')
    
    // Iniciar el estado actual de la semana con la fecha actual
    setCurrentWeekStart(new Date())
    
    // Para debugging
    console.log('Estado del servicio agendado:', servicioAgendadoStore.get())
  }, []) // El array de dependencias vacío asegura que se ejecute solo al montar el componente
  
  // Suscribirse a cambios en el store
  useEffect(() => {
    const unsubscribe = servicioAgendadoStore.listen(state => {
      setStoreState(state)
      // No intentamos recuperar la fecha del store al iniciar
      // Ya que queremos que siempre se inicie sin fecha seleccionada
    });
    
    return () => unsubscribe();
  }, []);

  // Generar fechas para mostrar, asegurando que no sean anteriores a hoy ni posteriores a maxDate
  const generateDateOptions = (): DateOption[] => {
    const options: DateOption[] = []
    const startDate = new Date(currentWeekStart)
    
    // Obtener el día que no trabaja el profesional del store
    const personaSeleccionada = servicioAgendadoStore.get().data.persona
    const dayNotWork = personaSeleccionada?.dayNotWork?.toLowerCase() || null
    
    // Mapeo de nombres de días en español a números (0=domingo, 1=lunes, etc.)
    const daysMap: Record<string, number> = {
      'domingo': 0,
      'lunes': 1,
      'martes': 2,
      'miércoles': 3,
      'miercoles': 3,
      'jueves': 4,
      'viernes': 5,
      'sábado': 6,
      'sabado': 6
    }
    
    // Día de la semana que no trabaja (número)
    const dayOffNumber = dayNotWork ? daysMap[dayNotWork] : -1
    
    // Generar 5 días desde la fecha de inicio actual
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      // No permitir fechas anteriores a hoy o posteriores al límite
      // Tampoco permitir el día que no trabaja el profesional
      const isDayOff = dayOffNumber !== -1 && date.getDay() === dayOffNumber
      const isAvailable = date >= today && date <= maxDate && !isDayOff
      
      options.push({
        date,
        available: isAvailable,
        slots: isAvailable ? Math.floor(Math.random() * 10) + 1 : 0 // Generar slots aleatorios
      })
    }
    
    return options
  }

  const [weekDates, setWeekDates] = useState(generateDateOptions())

  const navigateWeek = (direction: "prev" | "next") => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(currentWeekStart.getDate() + (direction === "next" ? 5 : -5))
    
    // Limitar navegación: no ir antes del día actual
    if (direction === "prev") {
      const compareDate = new Date(newStart)
      compareDate.setDate(newStart.getDate())
      if (compareDate < today) {
        // Si navegamos demasiado atrás, volver al día actual
        newStart.setTime(today.getTime())
      }
    }
    
    // Limitar navegación: no ir más allá de 30 días
    if (direction === "next") {
      const lastDayOfNewRange = new Date(newStart)
      lastDayOfNewRange.setDate(newStart.getDate() + 4) // El último día del rango de 5
      
      if (lastDayOfNewRange > maxDate) {
        // Si pasamos del límite, retroceder para que el último día sea maxDate
        newStart.setTime(maxDate.getTime())
        newStart.setDate(maxDate.getDate() - 4) // Retroceder 4 días desde maxDate
      }
    }
    
    setCurrentWeekStart(newStart)
    setWeekDates(generateDateOptions())
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
    setSelectedTime(null) // Resetear la hora seleccionada al cambiar de fecha
    
    // Formatear la fecha para guardarla en el store
    // Importante: guardar una cadena en formato estándar que pueda ser reconvertida a fecha
    // Formato ISO simplificado YYYY-MM-DD
    const isoDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    
    // Formato legible para el usuario
    const formattedDate = date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    // Actualizar el store con la fecha seleccionada y resetear la hora
    establecerFechaHora(formattedDate, '')
    
    // Para debugging
    console.log('Fecha seleccionada:', formattedDate)
  }
  
  // Manejar la selección de hora
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    
    // Actualizar el store con la hora seleccionada
    // Mantenemos la fecha que ya está en el store
    const currentState = servicioAgendadoStore.get()
    establecerFechaHora(currentState.data.fecha, time)
    
    console.log('Hora seleccionada:', time)
  }

  const handleContinuar = () => {
    // Aquí se podría implementar la navegación al siguiente paso
    const currentState = servicioAgendadoStore.get()
    console.log('Continuar con la reserva:', {
      fecha: currentState.data.fecha,
      hora: selectedTime
    })
    
    // Aquí podrías navegar a la siguiente página
    // window.location.href = '/siguiente-paso'
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
        Selección de Fecha y Hora
        </h1>
        <p className={generalConfig.classParagraphGeneral}>
          Escoge la fecha y hora en la que deseas agendar tu servicio
        </p>
      </div>
      <br />
      <div className='flex flex-col gap-4 justify-center items-center'>
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
                  ? "ring-2 ring-primary bg-gray-800 text-white" // Tema oscuro para la fecha seleccionada
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
        {/* Selected Date Info */}
      {selectedDate && (
        <div>
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
            </div>
          </div>
        </div>
        
        {/* Selector de Horarios */}
        <div className="mt-4">
          <TimeScheduler 
            selectedDate={selectedDate} 
            onTimeSelect={handleTimeSelect} 
            selectedTime={selectedTime} 
          />
        </div>
        
        {/* Botón para continuar */}
        {selectedDate && selectedTime && (
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleContinuar}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Continuar con la reserva
            </button>
          </div>
        )}
        </div>
      )}
      </div>
      <ServicioAgendadoInfo/>
    </div>
  )
}

export default ServiciosAgendamientoFecha
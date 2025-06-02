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
  // Usamos la fecha actual como punto de inicio
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  
  // Referencia a la fecha actual y la fecha límite (30 días hacia adelante)
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Resetear horas para comparaciones precisas
  
  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + 30) // Límite de 30 días hacia adelante
  const [storeState, setStoreState] = useState(servicioAgendadoStore.get())

  // Suscribirse a cambios en el store
  useEffect(() => {
    const unsubscribe = servicioAgendadoStore.listen(state => {
      setStoreState(state)
      // Si ya hay una fecha en el store, seleccionarla
      if (state.data.fecha) {
        try {
          // Intentar encontrar una fecha válida en el texto
          const dateRegex = /(\d{1,2})\s+de\s+(\w+)\s+de\s+(\d{4})/;
          const match = state.data.fecha.match(dateRegex);
          
          if (match) {
            const day = parseInt(match[1]);
            const monthName = match[2].toLowerCase();
            const year = parseInt(match[3]);
            
            // Mapeo de nombres de meses en español a números (0-11)
            const monthMap: {[key: string]: number} = {
              'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3,
              'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7,
              'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
            };
            
            const month = monthMap[monthName];
            
            if (!isNaN(day) && month !== undefined && !isNaN(year)) {
              const newDate = new Date(year, month, day);
              setSelectedDate(newDate);
            } else {
              console.error('Formato de fecha no reconocido:', state.data.fecha);
            }
          } else {
            // Si no se encuentra un patrón de fecha en español, intentar como fecha estándar
            const newDate = new Date(state.data.fecha);
            if (!isNaN(newDate.getTime())) {
              setSelectedDate(newDate);
            }
          }
        } catch (e) {
          console.error('Error al parsear la fecha', e);
        }
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Generar fechas para mostrar, asegurando que no sean anteriores a hoy ni posteriores a maxDate
  const generateWeekDates = (startDate: Date): DateOption[] => {
    const dates: DateOption[] = []
    const currentDate = new Date(startDate) // Usar la fecha de inicio tal cual
    
    // Asegurarse de que no estamos antes del día actual
    if (currentDate < today) {
      currentDate.setTime(today.getTime())
    }
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(currentDate)
      date.setDate(currentDate.getDate() + i)
      
      // No añadir fechas más allá del límite de 30 días
      if (date > maxDate) break
      
      dates.push({
        date,
        available: true, // Todos los días disponibles
        slots: 5, // Número fijo de espacios disponibles
      })
    }
    return dates
  }

  const [weekDates, setWeekDates] = useState(generateWeekDates(currentWeekStart))

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
    
    // Actualizar el store con la fecha seleccionada
    // Dejamos la hora vacía por ahora, se llenará en otro componente
    establecerFechaHora(formattedDate, '')
    
    // Para debugging
    console.log('Fecha seleccionada:', formattedDate)
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
      
    </div>
  )
}

export default ServiciosAgendamientoFecha
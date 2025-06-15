import React, { useState, useEffect } from 'react'
import ServicioAgendadoInfo from './ServicioAgendadoInfo'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { generalConfig } from '@util/generalConfig'
import { ToastContainer, toast } from 'react-toastify'
import { Calendar } from 'lucide-react'
import { servicioAgendadoStore } from '../../../stores/ServicesScheduling'
import axios from 'axios'

const ServiciosAgendamientoFinalUser = () => {
  const [user, setUser] = useState<any>(null)
  const [storeState, setStoreState] = useState(servicioAgendadoStore.get())
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false)

  useEffect(() => {
    // Obtener información del usuario de Google del localStorage
    const savedUser = localStorage.getItem('googleUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    
    // Suscribirse a los cambios en el store
    const unsubscribe = servicioAgendadoStore.listen(state => {
      setStoreState(state)
    })
    return () => unsubscribe()
  }, [])

  const handleSuccess = (response: any) => {
    const userToken = response.credential // El token JWT devuelto por Google
    
    // Decodificar el token para obtener la información del usuario
    const userInfo = JSON.parse(atob(userToken.split('.')[1]))
    setUser(userInfo)
    
    // Guardar la sesión en localStorage
    localStorage.setItem('googleToken', userToken)
    localStorage.setItem('googleUser', JSON.stringify(userInfo))
    toast.success('¡Sesión iniciada con éxito!')
  }

  const handleError = () => {
    console.error('Error al iniciar sesión con Google')
    toast.error('Error al iniciar sesión con Google')
  }

  const handleLogout = () => {
    setUser(null)
    
    // Eliminar la sesión de localStorage
    localStorage.removeItem('googleToken')
    localStorage.removeItem('googleUser')
    
    toast.info('Sesión cerrada')
  }
  
  // Función para crear la cita en el calendario
  const createAppointment = async () => {
    try {
      setIsCreatingAppointment(true)
      
      // Validar que todos los datos necesarios estén disponibles
      if (!user || !user.email || !user.name || !storeState.data.servicio || !storeState.data.fecha || !storeState.data.hora || !storeState.data.persona) {
        toast.error('Faltan datos para agendar la cita')
        setIsCreatingAppointment(false)
        return
      }
      
      // Obtener el calendarId de la persona seleccionada
      const calendarId = storeState.data.persona.calendarId || '8c7ab21ba8a0d96b02f493d0b58abaa286f9af12db4366f4356baf8ad30d208f@group.calendar.google.com'
      
      // Debug: Mostrar los datos que tenemos antes de formatear
      console.log('Datos crudos de fecha:', {
        fecha: storeState.data.fecha,
        hora: storeState.data.hora,
        startHour: storeState.data.startHour,
        endHour: storeState.data.endHour
      })
      
      // Formatear las fechas de inicio y fin para la cita en formato ISO 8601 usando Date object
      // Función auxiliar que garantiza formato ISO 8601 correcto usando objetos Date
      const formatToISO8601 = (dateStr: string, timeStr: string) => {
        try {
          // Limpiar posibles espacios en blanco
          dateStr = dateStr.trim()
          timeStr = timeStr.trim()
          
          // Obtener componentes de hora
          let hours = 0, minutes = 0, seconds = 0
          
          if (timeStr.includes(':')) {
            const timeParts = timeStr.split(':')
            hours = parseInt(timeParts[0], 10)
            minutes = parseInt(timeParts[1] || '0', 10)
            seconds = parseInt(timeParts[2] || '0', 10)
          } else {
            // Si solo hay un número, asumimos que son horas
            hours = parseInt(timeStr, 10)
          }
          
          // Obtener componentes de fecha
          const dateParts = dateStr.split('-')
          const year = parseInt(dateParts[0], 10)
          const month = parseInt(dateParts[1], 10) - 1 // Meses en JS son 0-11
          const day = parseInt(dateParts[2], 10)
          
          // Crear objeto Date
          const date = new Date(year, month, day, hours, minutes, seconds)
          
          // Formatear a ISO con timezone -05:00
          // Ajustar zona horaria manualmente ya que toISOString() siempre usa UTC
          const pad = (num: number) => String(num).padStart(2, '0')
          
          const formattedDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
          const formattedTime = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
          
          const isoString = `${formattedDate}T${formattedTime}-05:00`
          console.log('Fecha formateada:', isoString, 'a partir de:', { dateStr, timeStr })
          return isoString
        } catch (error) {
          console.error('Error al formatear fecha:', error)
          // Fallback: usar formato literal pero asegurando estructura básica
          return `${dateStr.trim()}T${timeStr.trim().includes(':') ? timeStr.trim() : `${timeStr.trim()}:00:00`}-05:00`
        }
      }
      
      // La hora de inicio es la seleccionada por el usuario
      const startTime = storeState.data.startHour || storeState.data.hora
      const startDateTime = formatToISO8601(storeState.data.fecha, startTime)
      
      // La hora de fin se calcula con la duración del servicio, o se usa endHour si está disponible
      const endTime = storeState.data.endHour || storeState.data.hora
      const endDateTime = formatToISO8601(storeState.data.fecha, endTime)
      
      // Crear la descripción para la cita
      const descripcion = `${storeState.data.servicio.nombre}, ID: ${storeState.data.servicio.id} - Duración: ${storeState.data.servicio.duracion} min - Profesional: ${storeState.data.persona.nombre} - Cliente: ${user.name} (${user.email}) - Sede: ${storeState.data.sede?.nombre}`
      
      // Formatear fechas en formato ISO 8601 siguiendo exactamente el formato requerido
      // Ejemplo: 2025-06-14T14:30:00-05:00
      
      // Parsear la fecha en formato español (ej: "17 de junio de 2025")
      const parseSpanishDate = (spanishDateStr: string): string => {
        console.log('Parseando fecha español:', spanishDateStr)
        
        // Traducir los meses del español al número
        const months: Record<string, string> = {
          'enero': '01',
          'febrero': '02',
          'marzo': '03',
          'abril': '04',
          'mayo': '05',
          'junio': '06',
          'julio': '07',
          'agosto': '08',
          'septiembre': '09',
          'octubre': '10',
          'noviembre': '11',
          'diciembre': '12'
        }
        
        try {
          // Separar la fecha
          const parts = spanishDateStr.toLowerCase().split(' de ')
          if (parts.length !== 3) {
            console.error('Formato de fecha español no reconocido')
            return '2025-06-10' // Usar una fecha por defecto en caso de error
          }
          
          const day = parts[0].padStart(2, '0')
          const month = months[parts[1]]
          const year = parts[2]
          
          if (!day || !month || !year) {
            console.error('Error al parsear fecha español, usando fecha por defecto')
            return '2025-06-10' // Usar una fecha por defecto en caso de error
          }
          
          return `${year}-${month}-${day}`
        } catch (error) {
          console.error('Error al procesar la fecha en español:', error)
          return '2025-06-10' // Usar una fecha por defecto en caso de error
        }
      }
      
      // Convertir hora AM/PM a formato 24h
      const convertTo24HourFormat = (timeWithAMPM: string): string => {
        console.log('Convertir a 24h:', timeWithAMPM)
        
        try {
          // Si ya está en formato 24h, devolverlo
          if (!timeWithAMPM.toLowerCase().includes('am') && !timeWithAMPM.toLowerCase().includes('pm')) {
            return timeWithAMPM
          }
          
          // Separar la hora y AM/PM
          let timePart = timeWithAMPM.replace(/\s+/g, '') // Eliminar espacios
          const isPM = timePart.toLowerCase().includes('pm')
          
          // Eliminar AM/PM
          timePart = timePart.toLowerCase().replace('am', '').replace('pm', '')
          
          // Separar horas y minutos
          const [hours, minutes] = timePart.split(':')
          let hoursNum = parseInt(hours, 10)
          
          // Ajustar para PM
          if (isPM && hoursNum < 12) {
            hoursNum += 12
          }
          // Ajustar para AM - 12 AM es 00:00 en formato 24h
          if (!isPM && hoursNum === 12) {
            hoursNum = 0
          }
          
          return `${hoursNum.toString().padStart(2, '0')}:${minutes}:00`
        } catch (error) {
          console.error('Error al convertir la hora a formato 24h:', error)
          return '00:00:00' // Hora por defecto en caso de error
        }
      }
      
      // Calcular la hora de finalización basada en la hora de inicio y la duración (en minutos)
      const calculateEndTime = (startTime: string, durationMinutes: number): string => {
        try {
          // Separar horas, minutos y segundos
          const [hours, minutes, seconds] = startTime.split(':').map(part => parseInt(part, 10))
          
          // Crear objeto Date para facilitar cálculos (usar una fecha arbitraria)
          const startDate = new Date(2023, 0, 1, hours, minutes, seconds)
          const endDate = new Date(startDate.getTime() + durationMinutes * 60000) // convertir minutos a milisegundos
          
          // Formatear la hora de fin
          const endHours = endDate.getHours().toString().padStart(2, '0')
          const endMinutes = endDate.getMinutes().toString().padStart(2, '0')
          const endSeconds = endDate.getSeconds().toString().padStart(2, '0')
          
          return `${endHours}:${endMinutes}:${endSeconds}`
        } catch (error) {
          console.error('Error al calcular la hora de finalización:', error)
          // En caso de error, devolver una hora 1 hora después (estimación)
          return startTime
        }
      }
      
      // Convertir fecha a formato ISO 8601
      const formattedDate = parseSpanishDate(storeState.data.fecha)
      console.log('Fecha formateada:', formattedDate)
      
      // Convertir hora a formato 24h
      const formattedTime = convertTo24HourFormat(storeState.data.hora)
      const formattedEndTime = calculateEndTime(formattedTime, storeState.data.servicio?.duracion || 30)
      console.log('Hora formateada:', formattedTime, 'Hora fin:', formattedEndTime)
      
      // Formatear en ISO 8601 exacto con zona horaria +02:00 (Europa)
      const formattedStartDateTime = `${formattedDate}T${formattedTime}+02:00`
      const formattedEndDateTime = `${formattedDate}T${formattedEndTime}+02:00`
      
      console.log('Fechas formateadas finales:')
      console.log('Start:', formattedStartDateTime)
      console.log('End:', formattedEndDateTime)
      
      // Datos para la API con las fechas formateadas correctamente
      const appointmentData = {
        calendarId,
        summary: user.email,
        description: descripcion,
        startDateTime: formattedStartDateTime,
        endDateTime: formattedEndDateTime,
        email: user.email,
        name: user.name
      }
      
      // Mostrar payload completo antes de enviarlo
      console.log('Payload a enviar:', JSON.stringify(appointmentData, null, 2))
      
      // Realizar la petición POST a la API
      const response = await axios.post('https://mi-express-app.vercel.app/api/calendar/appointments', appointmentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('Cita creada:', response.data)
      toast.success('¡Cita agendada con éxito!')
      
      // Redireccionar a página de inicio después de un breve momento
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    } catch (error) {
      console.error('Error al crear la cita:', error)
      toast.error('Error al agendar la cita. Inténtalo de nuevo.')
    } finally {
      setIsCreatingAppointment(false)
    }
  }

  return (
    <div className=" mx-auto px-4 py-8 flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ position: 'relative', top: '0', left: '0', margin: '0 auto', pointerEvents: 'auto' }}
      />
      {/* Título del componente */}
      <div className="w-full mt-2 flex flex-col justify-center items-center text-center gap-2">
        <h1 className={generalConfig.classTitlesGeneral}>
        Finalizar Agendamiento
        </h1>
        <p className={generalConfig.classParagraphGeneral}>
                  Inicia sesión para completar el agendamiento
        </p>
      </div>
      

      {/* Información del usuario o botón de inicio de sesión */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Información del Usuario</h2>
        
        <GoogleOAuthProvider clientId={generalConfig.GoogleAuth.clientId}>
          {user ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                {user.picture && (
                  <img 
                    className="w-24 h-24 rounded-full border-4 border-primary" 
                    src={user.picture} 
                    alt="Foto de perfil"
                  />
                )}
                <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                <p className="text-lg text-gray-600">{user.email}</p>
                
                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto justify-center">
                  <button
                    onClick={createAppointment}
                    disabled={isCreatingAppointment}
                    className={`px-6 py-3 ${isCreatingAppointment ? 'bg-gray-400' : 'bg-slate-600 hover:bg-primary/90'} text-white rounded-md transition duration-300 font-medium flex flex-row items-center justify-center gap-2`}
                  >
                    {isCreatingAppointment ? (
                      <>
                        <span className="animate-pulse">Creando cita...</span>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                      </>
                    ) : (
                      <>
                        Agendar Cita <Calendar className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    disabled={isCreatingAppointment}
                    className={`px-6 py-3 ${isCreatingAppointment ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'} text-white rounded-md transition duration-300`}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 text-center">
                      Iniciar sesión con tu cuenta de Google
                  </h2>
                  <p className="text-center text-gray-600 mb-6">
                    Para completar la reserva, necesitamos identificar tu cuenta
                  </p>
                  <div className="mt-8 space-y-6 flex justify-center">
                    <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                  </div>
              </div>
            </div>
          )}
        </GoogleOAuthProvider>
      </div>

      <div className="mt-8">
        <ServicioAgendadoInfo/>
      </div>
    </div>
  )
}

export default ServiciosAgendamientoFinalUser
import React, { useState, useEffect } from 'react'
import ServicioAgendadoInfo from './ServicioAgendadoInfo'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { generalConfig } from '@util/generalConfig'
import { ToastContainer, toast } from 'react-toastify'

const ServiciosAgendamientoFinalUser = () => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Obtener información del usuario de Google del localStorage
    const savedUser = localStorage.getItem('googleUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
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
      <div className="mt-8">
        <ServicioAgendadoInfo/>
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
                    onClick={() => {
                      // Simular el envío del formulario (esto podría conectarse a una API real)
                      toast.success('¡Cita agendada con éxito!')
                      setTimeout(() => {
                        // Redireccionar a página de confirmación o inicio
                        window.location.href = '/'
                      }, 2000)
                    }}
                    className="px-6 py-3 bg-slate-600 text-white rounded-md hover:bg-primary/90 transition duration-300 font-medium"
                  >
                    Agendar Cita
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
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
    </div>
  )
}

export default ServiciosAgendamientoFinalUser
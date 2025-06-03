import React from 'react'
import { ToastContainer } from 'react-toastify'
const ContenedorNotificaciones = () => {
  return (
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
  )
}

export default ContenedorNotificaciones
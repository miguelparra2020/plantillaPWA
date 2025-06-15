import { UserCalendarioConAgendamiento } from "@globals"
import React, { useState, useEffect } from 'react'
import QueryProvider from './QueryProvider'

const UserCalendars = () => {
  // Tabs disponibles
  const tabs = [
    { id: "servicios-con-agendamiento", label: "Servicios con agendamiento" },
  ]

  // Estados
  const [activeTab, setActiveTab] = useState("servicios-con-agendamiento")
  const [user, setUser] = useState<any>(null)

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

  // Función para cambiar de tab
  function changeTab(tabId: string) {
    setActiveTab(tabId)
  }

  // Si no hay usuario logueado, no mostrar nada
  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto mt-4 relative z-20">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 px-4">Agendas de usuario</h2>      
      {/* Menú de tabs */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex space-x-8 px-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`pb-2 px-1 ${activeTab === tab.id 
                ? "border-b-2 border-blue-500 text-blue-600" 
                : "text-gray-500"}`}
              onClick={() => changeTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido del tab */}
      <div className="px-4">
        
        {activeTab === "servicios-con-agendamiento" && (
          <div>
            <div className="bg-white rounded-md shadow p-4">
              <QueryProvider>
                <UserCalendarioConAgendamiento />
              </QueryProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCalendars
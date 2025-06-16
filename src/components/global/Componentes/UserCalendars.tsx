import { UserCalendarioConAgendamiento } from "@globals"
import React, { useState, useEffect } from 'react'
import QueryProvider from './QueryProvider'
import { Button } from "@component/ui/button"
import { Cog } from "lucide-react"

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

  const usersControl = [
    {"email":"dcano4703@gmail.com"},
    {"email":"oscarmarinez0802@gmail.com"},
    {"email":"miguelpaez9612@gmail.com"},    
  ]

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto mt-4 relative z-20">
      {(user && user.email && usersControl.some(userControl => userControl.email === user.email)) ? <>
        <Button 
            className="mx-auto p-4 mt-5 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 rounded flex items-center justify-center gap-2"
            onClick={() => window.location.href = "/controlf526f586"}
          >
            <Cog className="w-4 h-4" />
            Control administrativo
          </Button>
      </>        
      :null}
      <br />
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
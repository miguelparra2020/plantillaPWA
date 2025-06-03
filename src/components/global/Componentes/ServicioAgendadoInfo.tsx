import React from 'react'
import { servicioAgendadoStore} from '../../../stores/ServicesScheduling'
import { useStore } from '@nanostores/react'
import { Button } from '@component/ui/button'
import { MapPin, Building, Calendar, Clock, Scissors, User, Briefcase } from 'lucide-react'
import {  ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toast-custom.css'
import ContenedorNotificaciones from './ContenedorNotificaciones'

const ServicioAgendadoInfo = () => {
  const servicioAgendado = useStore(servicioAgendadoStore)
  const { servicio, sede, persona, fecha, hora } = servicioAgendado.data
  return (
    <div className="mt-6 mb-8">
      <ContenedorNotificaciones/>      
      <div className="bg-gray-50 rounded-lg p-4 mx-4 shadow-sm">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Resumen de agendamiento</h2>     
        {/* Informaciu00f3n del servicio seleccionado */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Servicio seleccionado</h3>
          {servicio ? (
            <div className="flex items-start gap-3 bg-white p-3 rounded-md border border-gray-100">
              <Scissors className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
              <div className="flex-grow">
                <p className="text-gray-900 font-medium text-sm">{servicio.nombre}</p>
                <p className="text-gray-500 text-xs mb-1">{servicio.descripcion}</p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{servicio.duracion} minutos</span>
                  </div>
                </div>
              </div>
              <Button
                className="ml-auto bg-slate-600 hover:bg-slate-500 text-white text-xs font-medium py-1 px-2 h-auto rounded-md flex items-center justify-center gap-1 flex-shrink-0"
                onClick={() => {
                  window.location.href = '/servicios';
                }}
              >
                <Scissors className="w-3.5 h-3.5" />
                <span >Editar</span>
              </Button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm bg-white p-3 rounded-md border border-gray-100">No has seleccionado ningún servicio</p>
          )}
        </div>
        {/* Informaciu00f3n de sede seleccionada */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Sede seleccionada</h3>
          {sede ? (
            <div className="flex items-start gap-3 bg-white p-3 rounded-md border border-gray-100">
              <Building className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
              <div className="flex-grow">
                <p className="text-gray-900 font-medium text-sm">{sede.nombre}</p>
                <p className="text-gray-500 text-xs mb-1">{sede.descripcion}</p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{sede.direccion}</span>
                  </div>
                </div>
              </div>
              <Button
                className="ml-auto bg-slate-600 hover:bg-slate-500 text-white text-xs font-medium py-1 px-2 h-auto rounded-md flex items-center justify-center gap-1 flex-shrink-0"
                onClick={() => {
                  window.location.href = '/serviciosagendamientosedes';
                }}
              >
                <Building className="w-3.5 h-3.5" />
                <span >Editar</span>
              </Button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm bg-white p-3 rounded-md border border-gray-100">No has seleccionado ninguna sede</p>
          )}
        </div>   
        {/* Información de profesional seleccionado */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Profesional seleccionado</h3>
          {persona ? (
            <div className="flex items-start gap-3 bg-white p-3 rounded-md border border-gray-100">
              <div className="flex-grow flex">
                <User className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0 mr-2" />
                <div className="flex-grow">
                  <p className="text-gray-900 font-medium text-sm">{persona.nombre}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="capitalize">{persona.cargo}</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-1">{persona.descripcion}</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <img 
                    src={persona.imagen} 
                    alt={`Foto de ${persona.nombre}`}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </div>
              </div>
              <Button
                className="ml-2 bg-slate-600 hover:bg-slate-500 text-white text-xs font-medium py-1 px-2 h-auto rounded-md flex items-center justify-center gap-1 flex-shrink-0"
                onClick={() => {
                  window.location.href = '/serviciosagendamientopersona';
                }}
              >
                <User className="w-3.5 h-3.5" />
                <span >Editar</span>
              </Button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm bg-white p-3 rounded-md border border-gray-100">No has seleccionado ningún profesional</p>
          )}
        </div>
        <br />
        {/* Información de fecha y hora seleccionada */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Fecha y hora</h3>
          <div className="flex items-start gap-3 bg-white p-3 rounded-md border border-gray-100">
            <Calendar className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
            <div className="flex-grow">
              {fecha ? (
                <p className="text-gray-900 font-medium text-sm">{fecha}</p>
              ) : (
                <p className="text-gray-500 text-sm">No has seleccionado fecha</p>
              )}
              {hora ? (
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Hora: {hora}</span>
                </div>
              ) : (
                <p className="text-gray-500 text-xs mt-1">Hora pendiente por seleccionar</p>
              )}
            </div>
            <Button
              className="ml-auto bg-slate-600 hover:bg-slate-500 text-white text-xs font-medium py-1 px-2 h-auto rounded-md flex items-center justify-center gap-1 flex-shrink-0"
              onClick={() => {
                window.location.href = '/serviciosagendamientofecha';
              }}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Editar</span>
            </Button>
          </div>
        </div>        
      </div>
    </div>
  )
}

export default ServicioAgendadoInfo
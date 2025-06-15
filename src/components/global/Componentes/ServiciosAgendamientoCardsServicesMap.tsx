import { Button } from "@component/ui/button"
import { Calendar, Clock, Eye } from "lucide-react"
import React from 'react'
import { toast } from 'react-toastify'
import { Servicio, ServiciosAgendamientoCardsServicesMapProps } from '../interfaces/ServiciosAgendamientoCardsInterface'
import ServiciosAgendamientoCardsModalDetail from './ServiciosAgendamientoCardsModalDetail'

const ServiciosAgendamientoCardsServicesMap: React.FC<ServiciosAgendamientoCardsServicesMapProps> = ({
  serviciosFiltrados,
  servicioAgendado,
  seleccionarServicio
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 pb-4">
        {serviciosFiltrados.map((servicio) => (
          <div 
          key={servicio.id} 
          className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow duration-300 max-w-xs"
        >
          {servicio.imgPrincipalServiceView && servicio.imgPrincipalService && (
            <div className="w-full h-40 overflow-hidden">
              <img 
                src={servicio.imgPrincipalService} 
                alt={servicio.nombre} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{servicio.nombre}</h3>
            
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {servicio.descripcion}
            </p>

            <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>{servicio.duracion} minutos</span>
            </div>
            
            
            {servicio.isActive !== false && (
              <div className="flex items-center gap-1 text-sm text-slate-400 mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>Disponible</span>
              </div>
            )}
            {servicio.priceView && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2 font-medium">
                <span>${new Intl.NumberFormat('es-CO').format(servicio.precio)}</span>
              </div>
            )}
            <div className="flex flex-row gap-2 justify-center items-center">
              { servicio.viewDetailsService ? 
                <ServiciosAgendamientoCardsModalDetail 
                  servicio={servicio} 
                  seleccionarServicio={seleccionarServicio} 
                />
              : null }
              <Button 
                className={`w-full ${servicioAgendado.data.servicio?.id === servicio.id ? 'bg-slate-500 hover:bg-slate-600' : 'bg-gray-900 hover:bg-gray-800'} text-white text-sm font-medium py-2 rounded flex items-center justify-center gap-1`}
                onClick={() => {
                  const servicioParaAgendar: Servicio = {
                    id: servicio.id,
                    nombre: servicio.nombre,
                    descripcion: servicio.descripcion,
                    precio: servicio.precio,
                    duracion: servicio.duracion,
                    typeDuration: servicio.typeDuration,
                    priceView: servicio.priceView,
                    isActive: servicio.isActive,
                    imgPrincipalService: servicio.imgPrincipalService,
                    imgPrincipalServiceView: servicio.imgPrincipalServiceView,
                    img2: servicio.img2,
                    img3: servicio.img3,
                    img4: servicio.img4,
                    img5: servicio.img5,
                    img6: servicio.img6,
                    video: servicio.video,
                    allDetailsService: servicio.allDetailsService, 
                    viewDetailsService: servicio.viewDetailsService,
                    serviceInSede: servicio.serviceInSede, 
                    sedesService: servicio.sedesService,
                    serviceForPerson: servicio.serviceForPerson, 
                    peopleProvideService: servicio.peopleProvideService, 
                    sheduDependOf: servicio.sheduDependOf 
                  }
                  seleccionarServicio(servicioParaAgendar)
                  toast.success(`Servicio '${servicio.nombre}' seleccionado para agendar`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  })                  
                  setTimeout(() => {
                    if (servicio.serviceInSede === true) {
                      window.location.href = '/serviciosagendamientosedes'
                    } 
                    if(servicio.serviceInSede === false && servicio.serviceForPerson === true) {
                      window.location.href = '/serviciosagendamientopersona'
                    }
                    if(servicio.serviceInSede === false && servicio.serviceForPerson === false){
                      window.location.href = '/serviciosagendamientofecha'
                    }
                  }, 1000)
                }}
              >
                <Calendar className="w-3.5 h-3.5" />
                {servicioAgendado.data.servicio?.id === servicio.id ? 'Servicio agendado' : 'Agendar servicio'}
              </Button>
              </div>
            </div>
          </div>
        ))}
      </div>  
      
    </>       
  )
}

export default ServiciosAgendamientoCardsServicesMap

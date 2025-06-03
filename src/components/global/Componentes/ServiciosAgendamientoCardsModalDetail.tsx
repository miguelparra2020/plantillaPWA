import React, { useState, useRef, useEffect } from "react"
import { Clock, DollarSign, Play, Calendar, Eye, X } from "lucide-react"
import { toast } from 'react-toastify'

import { Button } from "@component/ui/button"
import { Servicio } from '../interfaces/ServiciosAgendamientoCardsInterface'

interface ServiceModalProps {
  servicio: Servicio
  seleccionarServicio: (servicio: Servicio) => void;
  onClose?: () => void
}

const ServiciosAgendamientoCardsModalDetail = ({ servicio, seleccionarServicio }: ServiceModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedImage, setSelectedImage] = useState<string>(servicio.imgPrincipalService || '');
  const [showVideo, setShowVideo] = useState(false);

  const images = [
    servicio.imgPrincipalService,
    servicio.img2,
    servicio.img3,
    servicio.img4,
    servicio.img5,
    servicio.img6,
  ].filter(Boolean) as string[];
  
  const handleAgendarServicio = () => {
    seleccionarServicio(servicio);
    toast.success(`Servicio '${servicio.nombre}' seleccionado para agendar`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    
    // Cerrar el modal después de agendar
    setIsOpen(false);
    
    setTimeout(() => {
      if (servicio.serviceInSede === true) {
        window.location.href = '/serviciosagendamientosedes'
      } 
      else if(servicio.serviceInSede === false && servicio.serviceForPerson === true) {
        window.location.href = '/serviciosagendamientopersona'
      }
      else if(servicio.serviceInSede === false && servicio.serviceForPerson === false){
        window.location.href = '/serviciosagendamientofecha'
      }
    }, 2000);
  };

  // Cerrar el modal al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="w-[60%] bg-slate-600 text-white text-sm font-medium py-2 rounded flex items-center justify-center"
      >
        <Eye className="w-3.5 h-3.5 mr-1" />
        Ver detalles
      </Button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 py-20 px-4 overflow-hidden">
          <div 
            ref={modalRef}
            className="bg-white rounded-lg w-full max-w-[800px] my-auto max-h-[70vh] overflow-y-auto shadow-xl"
            style={{ margin: 'auto', position: 'relative', top: '0', maxHeight: 'calc(100vh - 200px)' }}
          >
            <div className="flex  mx-4 justify-between items-center border-b p-4">
              <div>
                <h2 className="text-2xl font-bold">{servicio.nombre}</h2>
                <p className="text-base text-gray-600">{servicio.descripcion}</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid  mx-4 grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div className="relative aspect-square rounded-lg overflow-hidden border">
                  {!showVideo ? (
                    <img 
                      src={selectedImage || "/placeholder.svg"} 
                      alt={servicio.nombre} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    servicio.video && (
                      <iframe width="300" height="400" src={servicio.video} title="Corte de cabello" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

                    )
                  )}
                  {servicio.video && !showVideo && (
                    <Button
                      className="absolute bottom-4 right-4 rounded-full bg-black/70 hover:bg-black/90 p-1"
                      onClick={() => setShowVideo(true)}
                    >
                      <Play className="h-6 w-6" />
                    </Button>
                  )}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`relative w-16 h-16 rounded-md overflow-hidden border cursor-pointer ${
                        selectedImage === img && !showVideo ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => {
                        setSelectedImage(img);
                        setShowVideo(false);
                      }}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${servicio.nombre} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {servicio.video && (
                    <div
                      className={`relative w-16 h-16 rounded-md overflow-hidden border cursor-pointer flex items-center justify-center bg-muted ${
                        showVideo ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setShowVideo(true)}
                    >
                      <Play className="h-6 w-6" />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-6">
                <div className="w-full">
                  <div className="grid w-full grid-cols-2 border-b">
                    <button 
                      onClick={() => setActiveTab('details')} 
                      className={`py-2 text-center ${activeTab === 'details' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
                    >
                      Detalles
                    </button>
                  </div>
                  <div className={`space-y-4 mt-4 ${activeTab === 'details' ? 'block' : 'hidden'}`}>
                    {servicio.viewDetailsService && servicio.allDetailsService && (
                      <div className="text-sm" dangerouslySetInnerHTML={{ __html: servicio.allDetailsService }}></div>
                    )}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span>Duración: {servicio.duracion} {servicio.typeDuration || 'minutos'}</span>
                      </div>
                      {servicio.priceView && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-muted-foreground" />
                          <span>Precio: ${new Intl.NumberFormat('es-CO').format(servicio.precio)}</span>
                        </div>
                      )}
                      {servicio.serviceForPerson && (
                        <span className="border px-2 py-1 rounded-md text-xs inline-block">
                          Requiere seleccionar profesional
                        </span>
                      )}
                      {!servicio.isActive && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs inline-block">
                          No disponible
                        </span>
                      )}
                      {servicio.isActive && (
                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Disponible para agendar</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="py-4 mx-4 border-t">
                  <Button 
                    className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white"
                    onClick={handleAgendarServicio}
                  >
                    <Calendar className="w-3.5 h-3.5 mr-2" />
                    Agendar servicio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiciosAgendamientoCardsModalDetail;

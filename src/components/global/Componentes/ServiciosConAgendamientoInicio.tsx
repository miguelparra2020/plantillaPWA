import { ButtonGeneral } from '@globals';
import { generalConfig } from '@util/generalConfig';
import { Scissors } from 'lucide-react';
import React from 'react'

// Constante con los servicios de barbería
const serviciosBarberia = [
  {
    id: 1,
    titulo: "Corte de cabello",
    descripcion: "Servicio completo de corte y estilo según tus preferencias, incluye lavado y acabado profesional.",
    duracion: "30 min",
    calificacion: 5.0
  },
  {
    id: 2,
    titulo: "Arreglo de barba",
    descripcion: "Perfilado y definición de barba con navaja, incluye productos hidratantes y aceites esenciales.",
    duracion: "20 min",
    calificacion: 5.0
  },
  {
    id: 3,
    titulo: "Cejas con navaja",
    descripcion: "Diseño y perfilado de cejas con precisión utilizando navaja tradicional para un acabado natural.",
    duracion: "5 min",
    calificacion: 5.0
  },
  {
    id: 4,
    titulo: "Corte + Barba",
    descripcion: "Combinación de corte de cabello y arreglo de barba completo para una imagen renovada y perfectamente equilibrada.",
    duracion: "45 min",
    calificacion: 5.0
  },
  {
    id: 5,
    titulo: "Corte + Cejas",
    descripcion: "Servicio que incluye corte de cabello personalizado y diseño de cejas para una apariencia armónica.",
    duracion: "40 min",
    calificacion: 5.0
  },
  {
    id: 6,
    titulo: "Corte + Barba + Cejas",
    descripcion: "Paquete completo que incluye corte de cabello, arreglo de barba y perfilado de cejas para un cambio integral.",
    duracion: "50 min",
    calificacion: 5.0
  },
  {
    id: 7,
    titulo: "Colorimetría",
    descripcion: "Servicio especializado de aplicación de color o decoloración con productos premium para lograr el tono deseado.",
    duracion: "90 min",
    calificacion: 5.0
  },
  {
    id: 8,
    titulo: "Delineado",
    descripcion: "Perfilado preciso de líneas y contornos con máquina o navaja para definir y mejorar el estilo de tu corte.",
    duracion: "10 min",
    calificacion: 5.0
  }
]

const ServiciosConAgendamientoInicio = () => {
    return (
        <div>
            
          <div className="p-10">
            <div className="w-full mt-2 flex flex-col justify-center items-center text-center">
              <h1 className={generalConfig.classTitlesGeneral}>
              Servicios de barbería diseñados para ti
              </h1>
            </div>

            {/* Layout para múltiples cards */}
              <div className="flex flex-col items-center justify-center w-full">
                <div className="w-[90%] pb-1 flex flex-col items-center justify-center text-center">
                  <p className={generalConfig.classParagraphGeneral}>
                  Descubre una experiencia de barbería donde cada servicio está pensado para realzar tu estilo personal.
                  </p>
                </div>

                {/* Card de Servicios con Agendamiento */}
                <div className="w-full my-8">
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    {serviciosBarberia.map((servicio) => (
                      <div 
                        key={servicio.id} 
                        className={`
                          bg-white p-5 
                          rounded 
                          shadow-lg 
                          border
                          text-center
                          w-full sm:w-[45%] md:w-[30%] 
                          flex flex-col items-center
                          mb-4
                        `}
                      >
                        <div className="mb-4 p-3 bg-slate-500 rounded-full">
                          <Scissors className="h-6 w-6 text-neutral-200" />
                        </div>
                        
                        
                        <h3 className="text-slate-800 font-semibold text-lg mb-2">{servicio.titulo}</h3>
                        <p className="text-stone-500 mb-4 text-sm">{servicio.descripcion}</p>
                        
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                <ButtonGeneral
                    as={generalConfig.Home.Wellcome.ButtonGeneralAs}
                    href={generalConfig.Home.Wellcome.ButtonGeneralHref}
                    className={generalConfig.Home.Wellcome.ButtonGeneralClass}
                    children={generalConfig.Home.Wellcome.ButtonGeneralName}
                    iconActive={generalConfig.Home.Wellcome.ButtonGeneralIconActive}
                />
                </div>
              </div>
          </div>
        </div>
    )
}

export default ServiciosConAgendamientoInicio



import { Button } from "@component/ui/button"
import { generalConfig } from "@util/generalConfig"
import { Calendar, Clock,  Search, X, Filter } from "lucide-react"
import React, { useState, useEffect } from "react"
import { Servicio as ServicioAgendamiento, seleccionarServicio, servicioAgendadoStore } from "../../../stores/ServicesScheduling"
import { useStore } from "@nanostores/react"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toast-custom.css' // Importamos nuestros estilos personalizados
import { ServicioAgendadoInfo } from "@globals"

interface Servicio {
  id: string
  nombre: string
  descripcion: string
  precio: number
  duracion: number
  popular?: boolean
}

type DuracionFiltro = 'todas' | 'corta' | 'media' | 'larga'

const servicios: Servicio[] = [
  {
    id: 'corte',
    nombre: 'Corte de cabello',
    descripcion: 'Corte de cabello con acabado profesional',
    precio: 30000,
    duracion: 30,
    popular: true
  },
  {
    id: 'barba',
    nombre: 'Arreglo de barba',
    descripcion: 'Arreglo y perfilado de barba',
    precio: 20000,
    duracion: 15
  },
  {
    id: 'cejas',
    nombre: 'Cejas con navaja',
    descripcion: 'Diseño y perfilado de cejas',
    precio: 15000,
    duracion: 15
  },
  {
    id: 'corte-barba',
    nombre: 'Corte + Barba',
    descripcion: 'Corte de cabello con arreglo de barba',
    precio: 45000,
    duracion: 45,
    popular: true
  },
  {
    id: 'corte-cejas',
    nombre: 'Corte + Cejas',
    descripcion: 'Corte de cabello con diseño de cejas',
    precio: 40000,
    duracion: 45
  },
  {
    id: 'completo',
    nombre: 'Corte + Barba + Cejas',
    descripcion: 'Servicio completo de barbería',
    precio: 60000,
    duracion: 60,
    popular: true
  },
  {
    id: 'colorimetria',
    nombre: 'Colorimetría',
    descripcion: 'Tinte y coloración profesional',
    precio: 80000,
    duracion: 90
  },
  {
    id: 'delineado',
    nombre: 'Delineado',
    descripcion: 'Delineado de barba y bigote',
    precio: 10000,
    duracion: 15
  }
]


const getFiltroCategoriaDuracion = (duracion: number): DuracionFiltro => {
  if (duracion <= 15) return 'corta'
  if (duracion <= 45) return 'media'
  return 'larga'
}

const ServiciosAgendamientoCards = () => {
  const [busqueda, setBusqueda] = useState('')
  const [filtroDuracion, setFiltroDuracion] = useState<DuracionFiltro>('todas')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [serviciosFiltrados, setServiciosFiltrados] = useState<Servicio[]>(servicios)
  const [servicioSeleccionado, setServicioSeleccionado] = useState<string | null>(null)
  const servicioAgendado = useStore(servicioAgendadoStore)
  const { servicio } = servicioAgendado.data
  useEffect(() => {
    const resultado = servicios.filter(servicio => {
      // Filtro por texto de búsqueda
      const coincideTexto = busqueda === '' || 
        servicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        servicio.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      
      // Filtro por duración
      const coincideDuracion = filtroDuracion === 'todas' || 
        getFiltroCategoriaDuracion(servicio.duracion) === filtroDuracion
      
      return coincideTexto && coincideDuracion
    })
    
    setServiciosFiltrados(resultado)
  }, [busqueda, filtroDuracion])

  const limpiarFiltros = () => {
    setBusqueda('')
    setFiltroDuracion('todas')
  }

  return (
    <div>
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
      <div className="w-full mt-2 flex flex-col justify-center items-center text-center gap-2">
        <h1 className={generalConfig.classTitlesGeneral}>
          Servicios con agendamiento
        </h1>
        <p className={generalConfig.classParagraphGeneral}>
          Escoge el servicio que mejor se adapte a tus necesidades
        </p>
      </div>
      <br />
      {/* Buscador y filtros */}
      <div className="flex flex-col justify-center items-center">
      <div className="px-4 py-2 max-w-md">
        <div className="flex flex-col sm:flex-row gap-2 mb-3">
          {/* Buscador */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-slate-500 focus:border-slate-500"
              placeholder="Buscar servicio..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setBusqueda('')}
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          {/* Botón filtro */}
          <div className="flex gap-2">
            <button
              className={`flex items-center justify-center gap-1 text-sm px-3 py-2 rounded-lg border ${
                mostrarFiltros ? 'bg-gray-100 border-gray-300' : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            
            {(busqueda || filtroDuracion !== 'todas') && (
              <button
                className="flex items-center justify-center gap-1 text-sm px-3 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-50"
                onClick={limpiarFiltros}
              >
                <X className="w-4 h-4" />
                Limpiar
              </button>
            )}
          </div>
        </div>
        
        {/* Panel de filtros */}
        {mostrarFiltros && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
            <h3 className="text-sm font-medium mb-2">Filtrar por duración</h3>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-3 py-1.5 text-xs rounded-full ${
                  filtroDuracion === 'todas' 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setFiltroDuracion('todas')}
              >
                Todas
              </button>
              <button
                className={`px-3 py-1.5 text-xs rounded-full ${
                  filtroDuracion === 'corta' 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setFiltroDuracion('corta')}
              >
                Rápido (15 min)
              </button>
              <button
                className={`px-3 py-1.5 text-xs rounded-full ${
                  filtroDuracion === 'media' 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setFiltroDuracion('media')}
              >
                Estándar (30-45 min)
              </button>
              <button
                className={`px-3 py-1.5 text-xs rounded-full ${
                  filtroDuracion === 'larga' 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setFiltroDuracion('larga')}
              >
                Completo (+60 min)
              </button>
            </div>
          </div>
        )}
        
        {/* Contador de resultados */}
        <div className="text-sm text-gray-500 mb-2">
          {serviciosFiltrados.length === 0 && (
            <p>No se encontraron servicios con los filtros seleccionados</p>
          )}
          {serviciosFiltrados.length > 0 && (
            <p>Mostrando {serviciosFiltrados.length} {serviciosFiltrados.length === 1 ? 'servicio' : 'servicios'}</p>
          )}
        </div>
      </div>
      </div>
      {/* Grid de servicios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 pb-4">
        {serviciosFiltrados.map((servicio) => (
          <div 
            key={servicio.id}
            className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow duration-300 max-w-xs"
          >
            <div className="p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-1">{servicio.nombre}</h3>
              
              <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                {servicio.descripcion}
              </p>

              <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{servicio.duracion} minutos</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-400 mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>Disponible</span>
              </div>

              <Button 
                className={`w-full ${servicioAgendado.data.servicio?.id === servicio.id ? 'bg-slate-500 hover:bg-slate-600' : 'bg-gray-900 hover:bg-gray-800'} text-white text-xs font-medium py-2 rounded flex items-center justify-center gap-1`}
                onClick={() => {
                  const servicioParaAgendar: ServicioAgendamiento = {
                    id: servicio.id,
                    nombre: servicio.nombre,
                    descripcion: servicio.descripcion,
                    precio: servicio.precio,
                    duracion: servicio.duracion,
                    popular: servicio.popular
                  }
                  seleccionarServicio(servicioParaAgendar)
                  setServicioSeleccionado(servicio.id)
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
                  setTimeout(() => {
                    window.location.href = '/serviciosagendamientosedes'
                  }, 2000)
                }}
              >
                <Calendar className="w-3.5 h-3.5" />
                {servicioAgendado.data.servicio?.id === servicio.id ? 'Servicio agendado' : 'Agendar servicio'}
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <ServicioAgendadoInfo/>
      {/* Botu00f3n de continuar */}
      <div className="w-full flex justify-center items-center mb-10">
      {servicio ?  (
          <Button 
            className="mx-auto p-4 mt-5 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 rounded flex items-center justify-center gap-2"
            onClick={() => {
              toast.success('Continuando con el agendamiento')
              window.location.href = '/serviciosagendamientosedes'
            }}
          >
            <Calendar className="w-4 h-4" />
            Continuar con el agendamiento
          </Button>
        ): null} 
        </div> 
    </div>
  )
}

export default ServiciosAgendamientoCards

import { Button } from "@component/ui/button"
import { generalConfig } from "@util/generalConfig"
import { MapPin, Phone, Building, Search, X, Filter, Check, Home, Star, Info, Calendar } from "lucide-react"
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toast-custom.css' // Importamos los estilos personalizados para toast
import { Sede as SedeAgendamiento, seleccionarSede, servicioAgendadoStore } from "../../../stores/ServicesScheduling"
import { useStore } from "@nanostores/react"
import { ServicioAgendadoInfo } from "@globals"

interface Sede {
  id: string
  nombre: string
  descripcion: string
  direccion: string
  zona: string
  telefono: string
  destacada?: boolean
}

type ZonaFiltro = 'todas' | 'norte' | 'sur' | 'este' | 'oeste' | 'centro'

const sedes: Sede[] = [
  {
    id: '1',
    nombre: 'Class Barber Ibiza Centro',
    descripcion: 'Nuestra sede principal con todos los servicios disponibles',
    direccion: 'España / Ibiza: X8J2+3WQ San Antonio Abad, España',
    zona: 'centro',
    telefono: '601-555-0100',
    destacada: true
  }
]


const ServiciosAgendamientoSedes = () => {
  const [busqueda, setBusqueda] = useState('')
  const [filtroZona, setFiltroZona] = useState<ZonaFiltro>('todas')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [sedesFiltradas, setSedesFiltradas] = useState<Sede[]>(sedes)
  const [sedeSeleccionadaId, setSedeSeleccionadaId] = useState<string | null>(null)
  const servicioAgendado = useStore(servicioAgendadoStore)
  const { servicio, sede } = servicioAgendado.data
  useEffect(() => {
    const resultado = sedes.filter(sede => {
      // Filtro por texto de búsqueda
      const coincideTexto = busqueda === '' || 
        sede.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        sede.descripcion.toLowerCase().includes(busqueda.toLowerCase()) || 
        sede.direccion.toLowerCase().includes(busqueda.toLowerCase())
      
      // Filtro por zona
      const coincideZona = filtroZona === 'todas' || sede.zona === filtroZona
      
      return coincideTexto && coincideZona
    })
    
    setSedesFiltradas(resultado)
  }, [busqueda, filtroZona])

  const limpiarFiltros = () => {
    setBusqueda('')
    setFiltroZona('todas')
  }

  return (
    <div>
      {/* Contenedor de notificaciones */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Título del componente */}
      <div className="w-full mt-2 flex flex-col justify-center items-center text-center gap-2">
        <h1 className={generalConfig.classTitlesGeneral}>
        Selección de Sede
        </h1>
        <p className={generalConfig.classParagraphGeneral}>
          Escoge la sede donde deseas agendar tu cita.
        </p>
      </div>
      <br />
      {/* Buscador y filtros */}
      <div className="flex flex-col justify-center items-center">
        <div className="px-4 py-2 max-w-md">
          <div className="flex items-center justify-between">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Buscar sedes..."
              />
            </div>
          </div>

          {/* Filtros */}
          {mostrarFiltros && (
            <div className="my-4 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Filtros</h3>
              <div className="mb-3">
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Zona
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <button
                    onClick={() => setFiltroZona('todas')}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${filtroZona === 'todas'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    Todas
                  </button>
                  <button
                    onClick={() => setFiltroZona('norte')}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${filtroZona === 'norte'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    Norte
                  </button>
                  <button
                    onClick={() => setFiltroZona('sur')}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${filtroZona === 'sur'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    Sur
                  </button>
                  <button
                    onClick={() => setFiltroZona('este')}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${filtroZona === 'este'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    Este
                  </button>
                  <button
                    onClick={() => setFiltroZona('oeste')}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${filtroZona === 'oeste'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    Oeste
                  </button>
                </div>
              </div>
              <button
                onClick={limpiarFiltros}
                className="mt-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Grid de sedes */}
      <div className="pt-8">
        {/* Contador de resultados */}
        <div className="flex justify-center items-center text-sm text-gray-500 mb-2 px-4 mx-auto">
          {sedesFiltradas.length === 0 && (
            <p>No se encontraron sedes con los filtros seleccionados</p>
          )}
          {sedesFiltradas.length > 0 && (
            <p>Mostrando {sedesFiltradas.length} {sedesFiltradas.length === 1 ? 'sede' : 'sedes'}</p>
          )}
        </div>
        
        {/* Grid de sedes con el mismo estilo que las tarjetas de servicios */}
        <div className="flex flex-wrap justify-center items-center gap-3 px-4 pb-4">
          {sedesFiltradas.map(sede => (
            <div 
              key={sede.id}
              className={`bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow duration-300 max-w-xs ${sede.destacada ? 'border-l-4 border-l-slate-500' : ''}`}
            >
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-1">{sede.nombre}</h3>
                
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {sede.descripcion}
                </p>

                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{sede.direccion}</span>
                </div>
                {sede.destacada && (
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                    <Star className="w-3.5 h-3.5" />
                    <span>Sede destacada</span>
                  </div>
                )}

                <Button 
                  disabled={!servicio}
                  className={`w-full ${servicioAgendado.data.sede?.id === sede.id ? 'bg-slate-500 hover:bg-slate-600' : 'bg-gray-900 hover:bg-gray-800'} text-white text-xs font-medium py-2 rounded flex items-center justify-center gap-1`}
                  onClick={() => {
                    const sedeParaAgendar: SedeAgendamiento = {
                      id: sede.id,
                      nombre: sede.nombre,
                      descripcion: sede.descripcion,
                      direccion: sede.direccion,
                      zona: sede.zona,
                      telefono: sede.telefono,
                      destacada: sede.destacada
                    }
                    seleccionarSede(sedeParaAgendar);
                    setSedeSeleccionadaId(sede.id);
                    toast.success(`Sede '${sede.nombre}' seleccionada correctamente`, {
                      position: "bottom-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  }}
                >
                  <Building className="w-3.5 h-3.5" />
                  {servicioAgendado.data.sede?.id === sede.id ? 'Sede seleccionada' : 'Seleccionar sede'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
          <ServicioAgendadoInfo/>
        {/* Botu00f3n de continuar */}
      <div className="w-full flex justify-center items-center mb-10">
      {servicio && sede && (
          <Button 
            className="mx-auto p-4 mt-5 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 rounded flex items-center justify-center gap-2"
            onClick={() => {
              toast.success('Continuando con el agendamiento');
              // Aquu00ed podru00edas redirigir a la pu00e1gina de selecciu00f3n de fecha y hora
              // window.location.href = '/seleccion-fecha';
            }}
          >
            <Calendar className="w-4 h-4" />
            Continuar con el agendamiento
          </Button>
        )}  
        </div>
          
    </div>
  )
}

export default ServiciosAgendamientoSedes

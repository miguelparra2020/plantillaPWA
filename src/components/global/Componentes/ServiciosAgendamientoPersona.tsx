import { Button } from "@component/ui/button"
import { generalConfig } from "@util/generalConfig"
import { Search, X, Filter, Check, Star, Info, Calendar, User, Briefcase } from "lucide-react"
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './toast-custom.css' // Importamos los estilos personalizados para toast
import { Persona as PersonaAgendamiento, seleccionarPersona, servicioAgendadoStore } from "../../../stores/ServicesScheduling"
import { useStore } from "@nanostores/react"
import { ServicioAgendadoInfo } from "@globals"
import BarberoOscar from "@img/profesionales/BarberoOscar.jpg"
import BarberoDaniel from "@img/profesionales/BarberoDaniel.jpg"

interface Persona {
  id: string
  nombre: string
  cargo: string
  descripcion: string
  destacado?: boolean
  imagen: string
}

type CargoFiltro = 'todos' | 'barbero' 

const personas: Persona[] = [
  {
    id: '1',
    nombre: 'Oscar Rodríguez',
    cargo: 'barbero',
    descripcion: 'Especialista en cortes clásicos y degradados con 8 años de experiencia',
    destacado: true,
    imagen: BarberoOscar
  },
  {
    id: '2',
    nombre: 'Daniel S. Cano',
    cargo: 'barbero',
    descripcion: 'Especialista en cortes clásicos y degradados con 6 años de experiencia',
    destacado: true,
    imagen: BarberoDaniel
  }
]


const ServiciosAgendamientoPersona = () => {
  const [busqueda, setBusqueda] = useState('')
  const [filtroCargo, setFiltroCargo] = useState<CargoFiltro>('todos')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [personasFiltradas, setPersonasFiltradas] = useState<Persona[]>(personas)
  const [personaSeleccionadaId, setPersonaSeleccionadaId] = useState<string | null>(null)
  const servicioAgendado = useStore(servicioAgendadoStore)
  const { servicio, sede, persona } = servicioAgendado.data

  useEffect(() => {
    const resultado = personas.filter(persona => {
      // Filtro por texto de búsqueda
      const coincideTexto = busqueda === '' || 
        persona.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        persona.descripcion.toLowerCase().includes(busqueda.toLowerCase()) || 
        persona.cargo.toLowerCase().includes(busqueda.toLowerCase())
      
      // Filtro por cargo
      const coincideCargo = filtroCargo === 'todos' || persona.cargo === filtroCargo
      
      return coincideTexto && coincideCargo
    })
    
    setPersonasFiltradas(resultado)
  }, [busqueda, filtroCargo])

  const limpiarFiltros = () => {
    setBusqueda('')
    setFiltroCargo('todos')
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
      {/* Título del componente */}
      <div className="w-full mt-2 flex flex-col justify-center items-center text-center gap-2">
        <h1 className={generalConfig.classTitlesGeneral}>
        Selección de Profesional
        </h1>
        <p className={generalConfig.classParagraphGeneral}>
          Escoge el profesional que te atenderá.
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
                onChange={(e) => setBusqueda(e.target.value)}
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-1 focus:ring-slate-500 focus:border-slate-500"
                placeholder="Buscar por nombre o cargo..."
              />
              {busqueda && (
                <button
                  type="button"
                  onClick={() => setBusqueda('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                </button>
              )}
            </div>
            <Button 
              className="ml-2 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center justify-center"
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
            >
              <Filter className="w-5 h-5 text-gray-700" />
            </Button>
          </div>
        </div>
        
        {/* Filtros */}
        {mostrarFiltros && (
          <div className="px-4 py-3 my-2 bg-slate-50 rounded-lg w-full max-w-md shadow-sm">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-gray-700 mb-1">Filtrar por cargo:</h3>
              <div className="flex flex-wrap gap-2">
                {(['todos', 'barbero'] as const).map((cargo) => (
                  <button
                    key={cargo}
                    onClick={() => setFiltroCargo(cargo)}
                    className={`px-3 py-1 text-xs rounded-full flex items-center ${filtroCargo === cargo ? 'bg-slate-600 text-white' : 'bg-slate-100 text-gray-700'}`}
                  >
                    {filtroCargo === cargo && <Check className="w-3 h-3 mr-1" />}
                    {cargo === 'todos' ? 'Todos los cargos' : 
                     cargo === 'barbero' ? 'Barberos' : ''}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={limpiarFiltros}
                className="text-xs text-slate-600 hover:text-slate-800 flex items-center"
              >
                <X className="w-3.5 h-3.5 mr-1" />
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
        
        {/* Contador de resultados */}
        <div className="flex justify-center items-center text-sm text-gray-500 mb-2 px-4 mx-auto">
          {personasFiltradas.length === 0 && (
            <p>No se encontraron profesionales con los filtros seleccionados</p>
          )}
          {personasFiltradas.length > 0 && (
            <p>Mostrando {personasFiltradas.length} {personasFiltradas.length === 1 ? 'profesional' : 'profesionales'}</p>
          )}
        </div>
        
        {/* Grid de personas con el mismo estilo que las tarjetas de servicios */}
        <div className="flex flex-wrap justify-center items-center gap-3 px-4 pb-4">
          {personasFiltradas.map(persona => (
            <div 
              key={persona.id}
              className={`bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm hover:shadow transition-shadow duration-300 max-w-xs ${persona.destacado ? 'border-l-4 border-l-slate-500' : ''}`}
            >
              <div className="flex p-4">
                <div className="flex-grow pr-3">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{persona.nombre}</h3>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span className="capitalize">{persona.cargo}</span>
                  </div>
                  
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                    {persona.descripcion}
                  </p>

                  {persona.destacado && (
                    <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                      <Star className="w-3.5 h-3.5" />
                      <span>Profesional destacado</span>
                    </div>
                  )}

                  <Button 
                    disabled={!servicio || !sede}
                    className={`w-full ${servicioAgendado.data.persona?.id === persona.id ? 'bg-slate-500 hover:bg-slate-600' : 'bg-gray-900 hover:bg-gray-800'} text-white text-xs font-medium py-2 rounded flex items-center justify-center gap-1`}
                    onClick={() => {
                      const personaParaAgendar: PersonaAgendamiento = {
                        id: persona.id,
                        nombre: persona.nombre,
                        cargo: persona.cargo,
                        descripcion: persona.descripcion,
                        destacado: persona.destacado,
                        imagen: persona.imagen
                      }
                      seleccionarPersona(personaParaAgendar);
                      setPersonaSeleccionadaId(persona.id);
                      toast.success(`Has seleccionado a ${persona.nombre} para tu cita`, {
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
                        window.location.href = '/serviciosagendamientofecha'
                      }, 2000)
                    }}
                  >
                    <User className="w-3.5 h-3.5" />
                    {servicioAgendado.data.persona?.id === persona.id ? 'Profesional seleccionado' : 'Seleccionar profesional'}
                  </Button>
                </div>
                <div className="ml-auto">
                  <img 
                    src={persona.imagen} 
                    alt={`Foto de ${persona.nombre}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ServicioAgendadoInfo/>
        {/* Botón de continuar */}
      <div className="w-full flex justify-center items-center mb-10">
      {servicio && sede && persona && (
          <Button 
            className="mx-auto p-4 mt-5 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 rounded flex items-center justify-center gap-2"
            onClick={() => {
              toast.success('Continuando con el agendamiento')
              window.location.href = '/serviciosagendamientofecha'
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

export default ServiciosAgendamientoPersona
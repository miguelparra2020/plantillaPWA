import { Filter, Search, X } from 'lucide-react'
import React from 'react'
import {  ServiciosAgendamientoCardsSearchFilterProps } from '../interfaces/ServiciosAgendamientoCardsInterface'


const ServiciosAgendamientoCardsSearchFilter: React.FC<ServiciosAgendamientoCardsSearchFilterProps> = ({
  busqueda,
  setBusqueda,
  filtroDuracion,
  setFiltroDuracion,
  mostrarFiltros,
  setMostrarFiltros,
  limpiarFiltros,
  serviciosFiltrados
}) => {
  return (
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
      
  )
}

export default ServiciosAgendamientoCardsSearchFilter

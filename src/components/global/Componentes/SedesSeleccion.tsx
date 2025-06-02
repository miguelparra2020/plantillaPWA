import { Button } from "@component/ui/button"
import { generalConfig } from "@util/generalConfig"
import { MapPin, Phone, Building, Search, X, Filter, Check, Home, Star, Info } from "lucide-react"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    id: 'sede-centro',
    nombre: 'Class Barber Centro',
    descripcion: 'Nuestra sede principal con todos los servicios disponibles',
    direccion: 'Calle Principal #123, Centro',
    zona: 'centro',
    telefono: '601-555-0100',
    destacada: true
  },
  {
    id: 'sede-norte',
    nombre: 'Class Barber Norte',
    descripcion: 'Barbería moderna en el norte de la ciudad',
    direccion: 'Av. Norte #456, Barrio Los Pinos',
    zona: 'norte',
    telefono: '601-555-0101'
  },
  {
    id: 'sede-sur',
    nombre: 'Class Barber Sur',
    descripcion: 'La mejor atención en la zona sur',
    direccion: 'Carrera 30 #78-25, Barrio El Vergel',
    zona: 'sur',
    telefono: '601-555-0102',
    destacada: true
  },
  {
    id: 'sede-este',
    nombre: 'Class Barber Oriente',
    descripcion: 'Servicios premium en el oriente de la ciudad',
    direccion: 'Calle 45 Este #23-10, Ciudad Jardín',
    zona: 'este',
    telefono: '601-555-0103'
  },
  {
    id: 'sede-oeste',
    nombre: 'Class Barber Occidente',
    descripcion: 'Exclusividad y calidad en cada servicio',
    direccion: 'Av. Occidental #89-32, Barrio El Refugio',
    zona: 'oeste',
    telefono: '601-555-0104',
    destacada: true
  },
  {
    id: 'sede-centro-2',
    nombre: 'Class Barber Premium',
    descripcion: 'Servicios VIP en pleno centro histórico',
    direccion: 'Plaza Mayor #10-15, Centro Histórico',
    zona: 'centro',
    telefono: '601-555-0105'
  }
]

const getSedeIcon = (id: string) => {
  // Determinar el icono basado en el ID o zona de la sede
  if (id.includes('centro')) {
    return <Building className="w-6 h-6 text-gray-600" />
  } else if (id.includes('norte') || id.includes('sur') || id.includes('este') || id.includes('oeste')) {
    return <Home className="w-6 h-6 text-gray-600" />
  } else {
    return <Building className="w-6 h-6 text-gray-600" />
  }
}

const SedesSeleccion = () => {
  const [busqueda, setBusqueda] = useState('')
  const [filtroZona, setFiltroZona] = useState<ZonaFiltro>('todas')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [sedesFiltradas, setSedesFiltradas] = useState<Sede[]>(sedes)
  const [sedeSeleccionada, setSedeSeleccionada] = useState<string | null>(null)
  
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
      {/* Título del componente */}
      <h2 className="text-xl font-bold text-center mb-4">Selección de Sede</h2>

      {/* Búsqueda y filtros */}
      <div className="mb-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar sede por nombre, descripción o dirección..."
            className="pl-10 pr-4 py-2 border rounded w-full"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 h-auto min-h-0"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {mostrarFiltros && (
          <div className="mt-2 p-3 border rounded shadow bg-white z-10 relative">
            <div className="mb-2">
              <div className="font-bold text-sm mb-2 flex items-center">
                <span>Filtrar por zona</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  className={`text-xs py-1 px-3 ${
                    filtroZona === 'norte' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => setFiltroZona('norte')}
                >
                  <Home className={`w-3 h-3 mr-1 ${filtroZona === 'norte' ? 'text-white' : 'text-gray-600'}`} />
                  Norte
                </Button>

                <Button
                  className={`text-xs py-1 px-3 ${
                    filtroZona === 'sur' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => setFiltroZona('sur')}
                >
                  <Home className={`w-3 h-3 mr-1 ${filtroZona === 'sur' ? 'text-white' : 'text-gray-600'}`} />
                  Sur
                </Button>

                <Button
                  className={`text-xs py-1 px-3 ${
                    filtroZona === 'este' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => setFiltroZona('este')}
                >
                  <Home className={`w-3 h-3 mr-1 ${filtroZona === 'este' ? 'text-white' : 'text-gray-600'}`} />
                  Este
                </Button>

                <Button
                  className={`text-xs py-1 px-3 ${
                    filtroZona === 'oeste' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => setFiltroZona('oeste')}
                >
                  <Home className={`w-3 h-3 mr-1 ${filtroZona === 'oeste' ? 'text-white' : 'text-gray-600'}`} />
                  Oeste
                </Button>

                <Button
                  className={`text-xs py-1 px-3 ${
                    filtroZona === 'centro' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                  onClick={() => setFiltroZona('centro')}
                >
                  <Building className={`w-3 h-3 mr-1 ${filtroZona === 'centro' ? 'text-white' : 'text-gray-600'}`} />
                  Centro
                </Button>

                <Button
                  className="text-xs py-1 px-3 bg-white border text-gray-800"
                  onClick={limpiarFiltros}
                >
                  <X className="w-3 h-3 mr-1" />
                  Limpiar filtros
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Listado de sedes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {sedesFiltradas.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No se encontraron sedes con los filtros actuales
          </div>
        ) : (
          sedesFiltradas.map(sede => (
            <div key={sede.id} className={`border rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${sede.destacada ? 'border-blue-300 bg-blue-50/30' : 'border-gray-200'}`}>
              <div className="p-4">
                <div className="flex items-start mb-3">
                  <div className="mr-2">
                    {getSedeIcon(sede.id)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{sede.nombre}</h3>
                    <p className="text-sm text-gray-500">{sede.descripcion}</p>
                  </div>
                  {sede.destacada && (
                    <div className="ml-auto">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </div>
                  )}
                </div>
                
                <div className="mb-3 text-sm flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{sede.direccion}</span>
                </div>
                
                <div className="mb-4 text-sm flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{sede.telefono}</span>
                </div>
                
                <Button 
                  className={`w-full ${sedeSeleccionada === sede.id ? 'bg-green-700 hover:bg-green-600' : 'bg-gray-900 hover:bg-gray-800'} text-white text-xs font-medium py-2 rounded flex items-center justify-center gap-1`}
                  onClick={() => {
                    setSedeSeleccionada(sede.id);
                    toast.success('Sede seleccionada correctamente');
                  }}
                >
                  <Info className="w-3.5 h-3.5" />
                  {sedeSeleccionada === sede.id ? 'Sede seleccionada' : 'Ver detalles'}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sección de sede seleccionada */}
      <div className="bg-gray-100 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">Sede seleccionada</h3>
        {sedeSeleccionada ? (
          sedesFiltradas.filter(s => s.id === sedeSeleccionada).map(sede => (
            <div key={sede.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{sede.nombre}</p>
                <p className="text-sm text-gray-600">{sede.direccion}</p>
              </div>
              <Button
                className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1"
                onClick={() => {
                  setSedeSeleccionada(null);
                  toast.info('Selección de sede cancelada');
                }}
              >
                <X className="w-3.5 h-3.5" />
                Cancelar
              </Button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No has seleccionado ninguna sede</p>
        )}
      </div>
    </div>
  );
};

export default SedesSeleccion;

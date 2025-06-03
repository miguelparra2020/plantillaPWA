export interface Servicio {
    id: string
    nombre: string
    descripcion: string
    precio: number
    duracion: number
    typeDuration?: 'minutos' | 'dia'
    priceView?: boolean
    isActive?: boolean 
    imgPrincipalService?: string
    imgPrincipalServiceView?: boolean 
    img2?: string
    img3?: string 
    img4?: string 
    img5?: string 
    img6?: string 
    video?: string 
    allDetailsService?: string
    viewDetailsService?: boolean
    serviceInSede?: boolean 
    sedesService?: number[]
    serviceForPerson?: boolean 
    peopleProvideService?: number[] 
    sheduDependOf?: 'service' | 'sede' | 'person' 
  }
  
  export type DuracionFiltro = 'todas' | 'corta' | 'media' | 'larga'

  export interface ServiciosAgendamientoCardsSearchFilterProps {
    busqueda: string;
    setBusqueda: (busqueda: string) => void;
    filtroDuracion: DuracionFiltro;
    setFiltroDuracion: (filtroDuracion: DuracionFiltro) => void;
    mostrarFiltros: boolean;
    setMostrarFiltros: (mostrarFiltros: boolean) => void;
    limpiarFiltros: () => void;
    serviciosFiltrados: Servicio[];
  }

  export interface ServiciosAgendamientoCardsServicesMapProps {
    serviciosFiltrados: Servicio[];
    servicioAgendado: any; // Tipo del store
    seleccionarServicio: (servicio: any) => void;
  }

  export interface ServiciosAgendamientoButtonNextProps {
    redirectPath?: string
  }
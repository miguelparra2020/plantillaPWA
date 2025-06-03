import React, { useState, useEffect } from "react"
import {  seleccionarServicio, servicioAgendadoStore } from "../../../stores/ServicesScheduling"
import { useStore } from "@nanostores/react"
import 'react-toastify/dist/ReactToastify.css'
import './toast-custom.css'
import { ContenedorNotificaciones, ServicioAgendadoInfo, ServiciosAgendamientoButtonNext, ServiciosAgendamientoCardsHeader, ServiciosAgendamientoCardsSearchFilter, ServiciosAgendamientoCardsServicesMap } from "@globals"
import { DuracionFiltro, Servicio } from "../interfaces/ServiciosAgendamientoCardsInterface"
import { servicios } from "../helpers/ServiciosAgendamientoCardsHelper"
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
  const servicioAgendado = useStore(servicioAgendadoStore)
  const { servicio } = servicioAgendado.data
  useEffect(() => {
    const resultado = servicios.filter(servicio => {
      const coincideTexto = busqueda === '' || 
        servicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        servicio.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      const coincideDuracion = filtroDuracion === 'todas' || 
        getFiltroCategoriaDuracion(servicio.duracion) === filtroDuracion
      const estaActivo = servicio.isActive !== false 
      return coincideTexto && coincideDuracion && estaActivo
    })    
    setServiciosFiltrados(resultado)
  }, [busqueda, filtroDuracion])

  const limpiarFiltros = () => {
    setBusqueda('')
    setFiltroDuracion('todas')
  }

  return (
    <div>
      <ContenedorNotificaciones/>
      <ServiciosAgendamientoCardsHeader/>
      <br />
      {/* Buscador y filtros */}
      <ServiciosAgendamientoCardsSearchFilter
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        filtroDuracion={filtroDuracion}
        setFiltroDuracion={setFiltroDuracion}
        mostrarFiltros={mostrarFiltros}
        setMostrarFiltros={setMostrarFiltros}
        limpiarFiltros={limpiarFiltros}
        serviciosFiltrados={serviciosFiltrados}
      />
      {/* Grid de servicios */}
      <ServiciosAgendamientoCardsServicesMap
        serviciosFiltrados={serviciosFiltrados}
        servicioAgendado={servicioAgendado}
        seleccionarServicio={seleccionarServicio}
      />      
      <ServicioAgendadoInfo/>
      {/* Botu00f3n de continuar */}
      <div className="w-full flex justify-center items-center mb-10">
      {servicio ?  (
          <ServiciosAgendamientoButtonNext redirectPath={''}/>
        ): null} 
      </div> 
    </div>
  )
}

export default ServiciosAgendamientoCards

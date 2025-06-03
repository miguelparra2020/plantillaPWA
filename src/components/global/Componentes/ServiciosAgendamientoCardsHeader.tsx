import { generalConfig } from '@util/generalConfig'
import React from 'react'
const ServiciosAgendamientoCardsHeader = () => {

  return (
      <div className="w-full mt-2 flex flex-col justify-center items-center text-center gap-2">
        <h1 className={generalConfig.classTitlesGeneral}>
          Servicios con agendamiento
        </h1>
        <p className={generalConfig.classParagraphGeneral}>
          Escoge el servicio que mejor se adapte a tus necesidades
        </p>
      </div>
  )
}

export default ServiciosAgendamientoCardsHeader

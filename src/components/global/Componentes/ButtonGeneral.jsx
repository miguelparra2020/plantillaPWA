import React from 'react'
import {  IconGeneral } from "@globals"

const   ButtonGeneral = ({
  as = 'button', // Define si será <button> o <a>
  href = "/", // La dirección para <a>
  target = '_self', // Opcional para <a>
  onClick=() => {}, // Función para manejar clics en <button>
  className = 'text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ', // Estilos personalizados
  children = 'Default',
  type = 'button',
  iconActive = false,
  iconColor = "currentColor",
  iconSize = "20"
  
}) => {

  if (as === 'a' && href) {
    return (
      <a href={href} target={target} className={className} type={type} onClick={onClick}>
        {children} {iconActive ?  <IconGeneral params={{color:iconColor,  size: iconSize, className: "ml-2" }}/> : null}  
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default ButtonGeneral

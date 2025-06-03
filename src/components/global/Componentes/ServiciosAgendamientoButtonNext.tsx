import { Button } from '@component/ui/button'
import { Calendar } from 'lucide-react'
import React from 'react'
import { toast } from 'react-toastify'
import { ServiciosAgendamientoButtonNextProps } from '../interfaces/ServiciosAgendamientoCardsInterface'

const ServiciosAgendamientoButtonNext = ({ redirectPath = '/serviciosagendamientosedes' }: ServiciosAgendamientoButtonNextProps) => {
  return (
          <Button 
            className="mx-auto p-4 mt-5 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 rounded flex items-center justify-center gap-2"
            onClick={() => {
              toast.success('Continuando con el agendamiento')
              window.location.href = redirectPath
            }}
          >
            <Calendar className="w-4 h-4" />
            Continuar con el agendamiento
          </Button>
  )
}

export default ServiciosAgendamientoButtonNext

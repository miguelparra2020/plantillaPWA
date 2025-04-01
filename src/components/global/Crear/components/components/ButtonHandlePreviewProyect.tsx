import React from 'react'
import { Eye, Pencil } from 'lucide-react'
import { ButtonHandlePreviewProyectProps } from '../../interfaces/models'
import { generalConfig } from "@util/generalConfig"


export const ButtonHandlePreviewProyect = ({ showPreview, setShowPreview }: ButtonHandlePreviewProyectProps) =>{
  return (
    <div className='pt-4'>
      <button
          type='button'
          onClick={() => setShowPreview(!showPreview)}
          className={`px-8 w-full z-10 h-10 flex items-center justify-center gap-2  bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-colors self-end`}
        >
          {showPreview ? <>
          <Pencil className='w-4 h-4' />
           Editar proyecto
          </> : <>
          <Eye className='w-4 h-4' />
            Previsualizar proyecto
          </>}
          
        </button>
    </div>
  )
}
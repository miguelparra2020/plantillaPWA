import React from 'react'
import { ArrowBigLeftDash, Sparkles } from 'lucide-react'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { crearStore } from 'src/stores/crearStore'
import { generalConfig } from "@util/generalConfig"
import { ButtonHandleNextStage2Props } from '../../interfaces/modelsStage2'

export const ButtonsHandleNextBackStage2 = ({ handleNext, handlePrev }: ButtonHandleNextStage2Props) =>{
  const { data: dataLanguaje} = useStore(languajePage)
  const store = useStore(crearStore)

  return (
        <div className="flex flex-row items-center justify-center gap-2 p-4">
            <button
                type="button"
                onClick={() => handlePrev()}
                className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
            >
                <ArrowBigLeftDash className="w-4 h-4" />
                Atrás
            </button>
            <button
                type="button"
                onClick={() => handleNext()}
                className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
            >
                <Sparkles className="w-4 h-4" />
                Siguiente personalización
            </button>
      </div>
  )
}


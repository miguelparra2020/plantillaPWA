import React from 'react'
import { useCrearContext } from '../../context/CrearContext'
import { Sparkles } from 'lucide-react'

interface ButtonHandleNextStage1Props {
    handleNext: () => void
}
export const ButtonHandleNextStage1 = ({ handleNext }: ButtonHandleNextStage1Props) =>{
    const { settings } = useCrearContext()
  return (
    <div className='p-4'>
      <button
          type='button'
          onClick={handleNext}
          disabled={settings.Stage1.storeName === '' || settings.Stage1.description === '' || settings.Stage1.language === ''}
          className={`w-full z-10 h-10 flex items-center justify-center gap-2 ${
            settings.Stage1.storeName === '' || settings.Stage1.description === '' || settings.Stage1.language === ''
              ? 'bg-zinc-600'
              : 'bg-zinc-900 hover:bg-zinc-800'
          }  text-white text-sm font-medium rounded-xl transition-colors self-end`}
        >
          <Sparkles className='w-4 h-4' />
          Empezar
        </button>
    </div>
  )
}
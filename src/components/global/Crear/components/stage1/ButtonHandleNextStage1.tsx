import React from 'react'
import { useCrearContext } from '../../../Context/CrearContext'
import { Sparkles } from 'lucide-react'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { ButtonHandleNextStage1Props } from '../../interfaces/modelsStage1'
import { generalConfig } from "@util/generalConfig"

export const ButtonHandleNextStage1 = ({ handleNext }: ButtonHandleNextStage1Props) =>{
    const { settings } = useCrearContext()
    const { data: dataLanguaje} = useStore(languajePage)
    
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
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.beginStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.beginStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.beginStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.beginStage1:""}
        </button>
    </div>
  )
}
import React from 'react'
import { Eye, Pencil } from 'lucide-react'
import { ButtonHandlePreviewProyectProps } from '../../interfaces/models'
import { generalConfig } from "@util/generalConfig"
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'


export const ButtonHandlePreviewProyect = ({ showPreview, setShowPreview }: ButtonHandlePreviewProyectProps) =>{
  const { data: dataLanguaje} = useStore(languajePage)
  return (
    <div className='pt-4'>
      <button
          type='button'
          onClick={() => setShowPreview(!showPreview)}
          className={`px-8 w-full z-10 h-10 flex items-center justify-center gap-2  bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-colors self-end`}
        >
          {showPreview ? <>
          <Pencil className='w-4 h-4' />
    {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.previewProject.es.editProject: null }
    {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.previewProject.en.editProject: null }
    {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.previewProject.pt.editProject: null }
    {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.previewProject.fr.editProject: null }
          </> : <>
          <Eye className='w-4 h-4' />
    {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.previewProject.es.previewProject:null}
    {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.previewProject.en.previewProject:null}
    {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.previewProject.pt.previewProject:null}
    {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.previewProject.fr.previewProject:null}
          </>}
          
        </button>
    </div>
  )
}
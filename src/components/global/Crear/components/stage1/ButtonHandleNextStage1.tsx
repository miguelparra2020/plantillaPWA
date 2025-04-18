import React from 'react'
import { Sparkles } from 'lucide-react'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { crearStore } from 'src/stores/crearStore'
import { ButtonHandleNextStage1Props } from '../../interfaces/modelsStage1'
import { generalConfig } from "@util/generalConfig"
import { toast, ToastContainer } from 'react-toastify'

export const ButtonHandleNextStage1 = ({ handleNext }: ButtonHandleNextStage1Props) =>{
  const { data: dataLanguaje} = useStore(languajePage)
  const store = useStore(crearStore)

  const handleNextCompleted = () => {
    toast.success(`Ha completado la primera etapa`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
    setTimeout(() => {
      handleNext()
    }, 1500)   
  }

  return (
    <div className='p-4'>
      <ToastContainer 
        className="mt-32"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          marginTop: '8rem',
          zIndex: 99999
        }}
      />
      <button
          type='button'
          onClick={handleNextCompleted}
          disabled={!store.infoStage1?.nombreComercio || !store.infoStage1?.descripcionActividad || !store.infoStage1?.idiomaPlataforma}
          className={`w-full z-10 h-10 flex items-center justify-center gap-2 ${
            !store.infoStage1?.nombreComercio || !store.infoStage1?.descripcionActividad || !store.infoStage1?.idiomaPlataforma
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
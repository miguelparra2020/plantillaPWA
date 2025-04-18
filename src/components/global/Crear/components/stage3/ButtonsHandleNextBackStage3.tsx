import React from 'react'
import { ArrowBigLeftDash, Sparkles } from 'lucide-react'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { crearStore } from 'src/stores/crearStore'
import { generalConfig } from "@util/generalConfig"
import { ButtonHandleNextStage3Props } from '../../interfaces/modelsStage3'
import { toast, ToastContainer } from 'react-toastify'

export const ButtonsHandleNextBackStage3 = ({ handleNext, handlePrev }: ButtonHandleNextStage3Props) =>{
  const { data: dataLanguaje} = useStore(languajePage)
  const store = useStore(crearStore)

  const handleNextCompleted = () => {
    toast.success(`Ha completado la tercera etapa`, {
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
        <div className="flex flex-row items-center justify-center gap-2 p-4">
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
                type="button"
                onClick={() => handlePrev()}
                className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
            >
                <ArrowBigLeftDash className="w-4 h-4" />
                {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.backButtonStage3:""}
                {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.backButtonStage3:""}
                {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.backButtonStage3:""}
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.backButtonStage3:""}
            </button>
            <button
                type="button"
                onClick={() => handleNextCompleted()}
                disabled={!store.infoStage3 || !store.infoStage3.bgColor || !store.infoStage3.bgShade || !store.infoStage3.rounded || !store.infoStage3.shadow}
                className={`w-full z-10 h-10 flex items-center justify-center gap-2 ${
                    !store.infoStage3 || !store.infoStage3.bgColor || !store.infoStage3.bgShade || !store.infoStage3.rounded || !store.infoStage3.shadow
                      ? 'bg-zinc-600'
                      : 'bg-zinc-900 hover:bg-zinc-800'
                  }  text-white text-sm font-medium rounded-xl transition-colors self-end`}
            >
                <Sparkles className="w-4 h-4" />
                {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.nextButtonStage3:""}
                {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.nextButtonStage3:""}
                {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.nextButtonStage3:""}
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.nextButtonStage3:""}
            </button>
      </div>
  )
}

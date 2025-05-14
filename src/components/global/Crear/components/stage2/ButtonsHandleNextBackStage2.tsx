import React, { useEffect, useState } from 'react'
import { ArrowBigLeftDash, Sparkles } from 'lucide-react'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { crearStore, InfoStage2 } from 'src/stores/crearStore'
import { generalConfig } from "@util/generalConfig"
import { ButtonHandleNextStage2Props } from '../../interfaces/modelsStage2'
import { toast, ToastContainer } from 'react-toastify'

export const ButtonsHandleNextBackStage2 = ({ handleNext, handlePrev }: ButtonHandleNextStage2Props) =>{
  const { data: dataLanguaje} = useStore(languajePage)
  const store = useStore(crearStore)
  const [localSettings, setLocalSettings] = useState<InfoStage2>(store.infoStage2 || {
    colorTitles: '',
    colorParagraph: '',
    titleFont: '',
    paragraphFont: '',
    titleWeight: '',
    paragraphWeight: '',
    titleSize: '',
    paragraphSize: '',
    titleColorIntensity: '',
    paragraphColorIntensity: '',
    colorTitlesSave: '',
    colorParagraphSave: '',
    classTitlesGeneral: '',
    classParagraphGeneral: ''
  })
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    if (store.infoStage2) {
      setLocalSettings(store.infoStage2)
    }
  }, [store.infoStage2])

  useEffect(() => {
    const validateForm = () => {
      const requiredFields = [
        localSettings.colorTitles,
        localSettings.colorParagraph,
        localSettings.titleFont,
        localSettings.paragraphFont,
        localSettings.titleWeight,
        localSettings.paragraphWeight,
        localSettings.titleSize,
        localSettings.paragraphSize,
        localSettings.titleColorIntensity,
        localSettings.paragraphColorIntensity
      ]
      setIsFormValid(requiredFields.every(field => field !== ''))
    }

    validateForm()
  }, [localSettings])

  const handleNextCompleted = () => {
    toast.success(`Ha completado la segunda etapa`, {
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
                {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.backButtonStage2:""}
                {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.backButtonStage2:""}
                {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.backButtonStage2:""}
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.backButtonStage2:""}
            </button>
            <button
                type="button"
                onClick={() => handleNextCompleted()}
                disabled={!isFormValid}
                className={`w-full z-10 h-10 flex items-center justify-center gap-2 ${
                    !isFormValid
                      ? 'bg-zinc-600'
                      : 'bg-zinc-900 hover:bg-zinc-800'
                  }  text-white text-sm font-medium rounded-xl transition-colors self-end`}
            >
                <Sparkles className="w-4 h-4" />
                {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.nextButtonStage2:""}
                {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.nextButtonStage2:""}
                {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.nextButtonStage2:""}
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.nextButtonStage2:""}
            </button>
      </div>
  )
}

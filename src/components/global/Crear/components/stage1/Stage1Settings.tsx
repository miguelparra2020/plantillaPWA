import React, { useState } from 'react'
import { Store, Globe, FileText } from 'lucide-react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { generalConfig } from "@util/generalConfig"
import { crearStore, type InfoStage1 } from 'src/stores/crearStore'

export const Stage1Settings = () => {
  const { data: dataLanguaje} = useStore(languajePage)
  const store = useStore(crearStore)
  const [localSettings, setLocalSettings] = useState<InfoStage1>(store.infoStage1 || {
    nombreComercio: '',
    descripcionActividad: '',
    idiomaPlataforma: ''
  })

  const handleSettingsChange = (key: keyof InfoStage1, value: string) => {
    const updatedSettings = { ...localSettings, [key]: value }
    setLocalSettings(updatedSettings)

    setTimeout(() => {
      crearStore.set({ ...crearStore.get(), infoStage1: updatedSettings })
    }, 300)
  }

  return (
    <div>
      <form className='flex flex-col gap-4 flex-1 p-4 justify-between'>
        <div className='space-y-4'>
          {/* Nombre de la empresa */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Store className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.nameEcommerceStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.nameEcommerceStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.nameEcommerceStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.nameEcommerceStage1:""}</span>
            </div>
            <Input
              type='text'
              placeholder={`${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.placeholderNameEcommerceStage1:""}${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.placeholderNameEcommerceStage1:""}${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.placeholderNameEcommerceStage1:""}${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.placeholderNameEcommerceStage1:""}`}
              value={localSettings.nombreComercio}
              onChange={(e) => handleSettingsChange('nombreComercio', e.target.value)}
              className='w-full bg-zinc-100  text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 '
            />
          </div>
          {/* Descripción */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <FileText className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.activityEcommerceStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.activityEcommerceStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.activityEcommerceStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.activityEcommerceStage1:""}
              </span>
            </div>
            <Textarea
              placeholder={`${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.placeholderActivityEcommerceStage1:""}${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.placeholderActivityEcommerceStage1:""}${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.placeholderActivityEcommerceStage1:""}${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.placeholderActivityEcommerceStage1:""}`}
              value={localSettings.descripcionActividad}
              onChange={(e) => handleSettingsChange('descripcionActividad', e.target.value)}
              className='w-full bg-zinc-100  text-sm text-zinc-900  placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900  min-h-[100px]'
            />
          </div>
          {/* Idioma */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Globe className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.languagePageStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.languagePageStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.languagePageStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.languagePageStage1:""}</span>
            </div>
            <Select value={localSettings.idiomaPlataforma} onValueChange={(value) => handleSettingsChange('idiomaPlataforma', value)}>
              <SelectTrigger className='w-full h-10 bg-zinc-100  border-zinc-200 rounded-xl'>
                <SelectValue placeholder={`${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.placeholderLanguagePageStage1 :""}${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.placeholderLanguagePageStage1:""}${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.placeholderLanguagePageStage1:""}${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.placeholderLanguagePageStage1:""}`} />
              </SelectTrigger>
              <SelectContent className='absolute z-[3000] mt-2 bg-white'>
                <SelectItem value='/es/'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.languageEsPageStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.languageEsPageStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.languageEsPageStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.languageEsPageStage1:""}
                </SelectItem>
                <SelectItem value='/en/'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.languageEnPageStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.languageEnPageStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.languageEnPageStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.languageEnPageStage1:""}
                </SelectItem>
                <SelectItem value='/pt/'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.languagePtPageStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.languagePtPageStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.languagePtPageStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.languagePtPageStage1:""}
                </SelectItem>
                <SelectItem value='/fr/'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.languageFrPageStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.languageFrPageStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.languageFrPageStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.languageFrPageStage1:""}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Preguntas por que elegirnos */}
        <div className='space-y-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50'>
          <div className='text-sm text-zinc-700 dark:text-zinc-300'>
            <p className='font-medium mb-2'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.proofQuestionStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.proofQuestionStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.proofQuestionStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.proofQuestionStage1:""}
            </p>
            <ul className='space-y-1 text-xs text-zinc-500 dark:text-zinc-400'>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.proofItem1Stage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.proofItem1Stage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.proofItem1Stage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.proofItem1Stage1:""}
              </li>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.proofItem2Stage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.proofItem2Stage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.proofItem2Stage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.proofItem2Stage1:""}
              </li>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.proofItem3Stage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.proofItem3Stage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.proofItem3Stage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.proofItem3Stage1:""}
              </li>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.proofItem4Stage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.proofItem4Stage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.proofItem4Stage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.proofItem4Stage1:""}
              </li>
            </ul>
          </div>
        </div>
        
      </form>
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import { Type, Palette, ArrowBigRightDash } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { generalConfig } from "@util/generalConfig"
import { crearStore, type InfoStage2 } from 'src/stores/crearStore'
import { colorOptionsTitles, fontOptions, sizeOptions, weightOptions } from '../../helpers/helpersStage2'


const Stage2Settings = () => {
  const { data: dataLanguaje} = useStore(languajePage)
  const store = useStore(crearStore)
  const [localSettings, setLocalSettings] = useState<InfoStage2>(store.infoStage2 || {
    colorTitles: 'blue',
    colorParagraph: 'gray',
    colorTitlesSave: 'text-blue-700',
    colorParagraphSave: 'text-gray-600',
    titleFont: '',
    paragraphFont: '',
    titleWeight: '',
    paragraphWeight: '',
    titleSize: '',
    paragraphSize: '',
    titleColorIntensity: '700',
    paragraphColorIntensity: '600'
  })

 

 

  const handleSettingsChange = (key: keyof InfoStage2, value: string) => {
    const updatedSettings = { 
      ...localSettings, 
      [key]: value,
      colorTitlesSave: key === 'colorTitles' ? `text-${value}-${localSettings.titleColorIntensity}` : localSettings.colorTitlesSave,
      colorParagraphSave: key === 'colorParagraph' ? `text-${value}-${localSettings.paragraphColorIntensity}` : localSettings.colorParagraphSave
    }
    setLocalSettings(updatedSettings)

    setTimeout(() => {
      crearStore.set({ ...crearStore.get(), infoStage2: updatedSettings })
    }, 300)
  }

  const handleIntensityChange = (type: 'title' | 'paragraph', value: string) => {
    const key = type === 'title' ? 'titleColorIntensity' : 'paragraphColorIntensity'
    const colorKey = type === 'title' ? 'colorTitles' : 'colorParagraph'
    const updatedSettings = {
      ...localSettings,
      [key]: value,
      colorTitlesSave: type === 'title' ? `text-${localSettings.colorTitles}-${value}` : localSettings.colorTitlesSave,
      colorParagraphSave: type === 'paragraph' ? `text-${localSettings.colorParagraph}-${value}` : localSettings.colorParagraphSave
    }
    setLocalSettings(updatedSettings)

    setTimeout(() => {
      crearStore.set({ ...crearStore.get(), infoStage2: updatedSettings })
    }, 300)
  }


  const titleColorClass = `text-${localSettings.colorTitles}-${localSettings.titleColorIntensity}`
  
  const paragraphColorClass = `text-${localSettings.colorParagraph}-${localSettings.paragraphColorIntensity}`

  

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mt-2 space-y-6">
          <div className="space-y-6">
            <div className="p-4 border border-zinc-200  rounded-xl">
              <h4 className={`${localSettings.titleSize} ${localSettings.titleWeight} mb-2 ${titleColorClass} ${localSettings.titleFont} `}>
                {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.previewTitleStage2:""}
                {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.previewTitleStage2:""}
                {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.previewTitleStage2:""}
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.previewTitleStage2:""}
              </h4>
              <p className={`${localSettings.paragraphSize} ${localSettings.paragraphWeight} ${paragraphColorClass} ${localSettings.paragraphFont}`}>
                {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.previewParagraphStage2:""}
                {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.previewParagraphStage2:""}
                {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.previewParagraphStage2:""}
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.previewParagraphStage2:""}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">
                  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.colorTitleStage2:""}
                  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.colorTitleStage2:""}
                  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.colorTitleStage2:""}
                  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.colorTitleStage2:""}
                  {!localSettings.colorTitles && <span className="text-red-500 ml-1">*</span>}
                </span>
              </div>
              <Select
                value={localSettings.colorTitles}
                onValueChange={(value) => handleSettingsChange("colorTitles", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un color" />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  {colorOptionsTitles.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full bg-${color.value}-500`} />
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>
                    {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.titleIntensityStage2:""}
                    {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.titleIntensityStage2:""}
                    {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.titleIntensityStage2:""}
                    {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.titleIntensityStage2:""}
                    : {localSettings.titleColorIntensity}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="700"
                  step="100"
                  value={localSettings.titleColorIntensity}
                  onChange={(e) => handleIntensityChange('title', e.target.value)}
                  className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>500</span>
                  <span>600</span>
                  <span>700</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">
                  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.colorParagraphStage2:""}
                  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.colorParagraphStage2:""}
                  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.colorParagraphStage2:""}
                  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.colorParagraphStage2:""}
                  {!localSettings.colorParagraph && <span className="text-red-500 ml-1">*</span>}
                </span>
              </div>
              <Select
                value={localSettings.colorParagraph}
                onValueChange={(value) => handleSettingsChange("colorParagraph", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un color" />
                </SelectTrigger>
                <SelectContent  className='bg-white'>
                  {colorOptionsTitles.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full bg-${color.value}-500`} />
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-zinc-500">
                  <span>
                    {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.paragraphIntensityStage2:""}
                    {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.paragraphIntensityStage2:""}
                    {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.paragraphIntensityStage2:""}
                    {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.paragraphIntensityStage2:""}
                    : {localSettings.paragraphColorIntensity}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="700"
                  step="100"
                  value={localSettings.paragraphColorIntensity}
                  onChange={(e) => handleIntensityChange('paragraph', e.target.value)}
                  className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>500</span>
                  <span>600</span>
                  <span>700</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">
                  {dataLanguaje.languajeChoose === "/es/" ? "Fuente para títulos":""}
                  {dataLanguaje.languajeChoose === "/en/" ? "Title font":""}
                  {dataLanguaje.languajeChoose === "/pt/" ? "Fonte para títulos":""}
                  {dataLanguaje.languajeChoose === "/fr/" ? "Police pour titres":""}
                  {!localSettings.titleFont && <span className="text-red-500 ml-1">*</span>}
                </span>
              </div>
              <Select
                value={localSettings.titleFont}
                onValueChange={(value) => handleSettingsChange("titleFont", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <SelectValue placeholder="Seleccione una fuente" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span className={`${font.value}`}>{font.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">
                  {dataLanguaje.languajeChoose === "/es/" ? "Peso del título":""}
                  {dataLanguaje.languajeChoose === "/en/" ? "Title weight":""}
                  {dataLanguaje.languajeChoose === "/pt/" ? "Peso do título":""}
                  {dataLanguaje.languajeChoose === "/fr/" ? "Poids du titre":""}
                  {!localSettings.titleWeight && <span className="text-red-500 ml-1">*</span>}
                </span>
              </div>
              <Select
                value={localSettings.titleWeight}
                onValueChange={(value) => handleSettingsChange("titleWeight", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <SelectValue placeholder="Seleccione un peso" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {weightOptions.map((weight) => (
                    <SelectItem key={weight.value} value={weight.value}>
                      <span className={weight.value}>{weight.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">
                  {dataLanguaje.languajeChoose === "/es/" ? "Tamaño del título":""}
                  {dataLanguaje.languajeChoose === "/en/" ? "Title size":""}
                  {dataLanguaje.languajeChoose === "/pt/" ? "Tamanho do título":""}
                  {dataLanguaje.languajeChoose === "/fr/" ? "Taille du titre":""}
                  {!localSettings.titleSize && <span className="text-red-500 ml-1">*</span>}
                </span>
              </div>
              <Select
                value={localSettings.titleSize}
                onValueChange={(value) => handleSettingsChange("titleSize", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <SelectValue placeholder="Seleccione un tamaño" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {sizeOptions.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      <span className={size.value}>{size.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">
                  {dataLanguaje.languajeChoose === "/es/" ? "Fuente para párrafos":""}
                  {dataLanguaje.languajeChoose === "/en/" ? "Paragraph font":""}
                  {dataLanguaje.languajeChoose === "/pt/" ? "Fonte para parágrafos":""}
                  {dataLanguaje.languajeChoose === "/fr/" ? "Police pour paragraphes":""}
                  {!localSettings.paragraphFont && <span className="text-red-500 ml-1">*</span>}
                </span>
              </div>
              <Select
                value={localSettings.paragraphFont}
                onValueChange={(value) => handleSettingsChange("paragraphFont", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <SelectValue placeholder="Seleccione una fuente" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {fontOptions.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span className={`${font.value}`}>{font.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">
                  {dataLanguaje.languajeChoose === "/es/" ? "Peso del párrafo":""}
                  {dataLanguaje.languajeChoose === "/en/" ? "Paragraph weight":""}
                  {dataLanguaje.languajeChoose === "/pt/" ? "Peso do parágrafo":""}
                  {dataLanguaje.languajeChoose === "/fr/" ? "Poids du paragraphe":""}
                  {!localSettings.paragraphWeight && <span className="text-red-500 ml-1">*</span>}
                </span>
              </div>
              <Select
                value={localSettings.paragraphWeight}
                onValueChange={(value) => handleSettingsChange("paragraphWeight", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <SelectValue placeholder="Seleccione un peso" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {weightOptions.map((weight) => (
                    <SelectItem key={weight.value} value={weight.value}>
                      <span className={weight.value}>{weight.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">
                  {dataLanguaje.languajeChoose === "/es/" ? "Tamaño del párrafo":""}
                  {dataLanguaje.languajeChoose === "/en/" ? "Paragraph size":""}
                  {dataLanguaje.languajeChoose === "/pt/" ? "Tamanho do parágrafo":""}
                  {dataLanguaje.languajeChoose === "/fr/" ? "Taille du paragraphe":""}
                  {!localSettings.paragraphSize && <span className="text-red-500 ml-1">*</span>}
                </span>
              </div>
              <Select
                value={localSettings.paragraphSize}
                onValueChange={(value) => handleSettingsChange("paragraphSize", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <SelectValue placeholder="Seleccione un tamaño" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {sizeOptions.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      <span className={size.value}>{size.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 p-4 rounded-xl bg-zinc-50 ">
            <div className="text-sm text-zinc-700 ">
              <p className="font-medium mb-2">
                {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.proofQuestionStage2:""}
                {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.proofQuestionStage2:""}
                {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.proofQuestionStage2:""}
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.proofQuestionStage2:""}
              </p>
              <ul className="space-y-1 text-xs text-zinc-500 ">
                <li className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.proofItem1Stage2:""}
                  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.proofItem1Stage2:""}
                  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.proofItem1Stage2:""}
                  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.proofItem1Stage2:""}
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.proofItem2Stage2:""}
                  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.proofItem2Stage2:""}
                  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.proofItem2Stage2:""}
                  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.proofItem2Stage2:""}
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.proofItem3Stage2:""}
                  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.proofItem3Stage2:""}
                  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.proofItem3Stage2:""}
                  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.proofItem3Stage2:""}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stage2Settings
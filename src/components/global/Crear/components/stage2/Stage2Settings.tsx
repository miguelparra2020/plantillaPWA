import React, { useState } from 'react'
import { Type, Palette } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { generalConfig } from "@util/generalConfig"
import { crearStore, type InfoStage2 } from 'src/stores/crearStore'
import { colorClassMap, colorOptionsTitles } from '../../helpers/helpersStage2'

const Stage2Settings = () => {
  const { data: dataLanguaje} = useStore(languajePage)
  const store = useStore(crearStore)
  const [localSettings, setLocalSettings] = useState<InfoStage2>(store.infoStage2 || {
    colorTitles: '',
    colorParagraph: '',
    colorTitlesSave: '',
    colorParagraphSave: '',
    titleFont: 'font-roboto',
    paragraphFont: 'font-open-sans',
    titleWeight: 'font-medium',
    paragraphWeight: 'font-normal',
    titleSize: 'text-lg',
    paragraphSize: 'text-sm',
  })

  // Opciones de fuentes
  const fontOptions = [
    { name: "Roboto", value: "font-roboto" },
    { name: "Open Sans", value: "font-open-sans" },
    { name: "Montserrat", value: "font-montserrat" },
    { name: "Poppins", value: "font-poppins" },
    { name: "Lato", value: "font-lato" },
    { name: "Raleway", value: "font-raleway" },
    { name: "Playfair Display", value: "font-playfair" },
    { name: "Source Sans Pro", value: "font-source-sans" },
  ]

  const handleSettingsChange = (key: keyof InfoStage2, value: string) => {
    const updatedSettings = { 
      ...localSettings, 
      [key]: value,
      colorTitlesSave: key === 'colorTitles' ? `text-${value}-700` : localSettings.colorTitlesSave,
      colorParagraphSave: key === 'colorParagraph' ? `text-${value}-600` : localSettings.colorParagraphSave
    }
    setLocalSettings(updatedSettings)

    setTimeout(() => {
      crearStore.set({ ...crearStore.get(), infoStage2: updatedSettings })
    }, 300)
  }

  const getColorClass = (color: string, isTitle: boolean) => {
    const colorOption = colorOptionsTitles.find((option) => option.value === color)
    if (!colorOption) return ""
    const shade = isTitle ? colorOption.titleShade : colorOption.paragraphShade
    return colorClassMap[color as keyof typeof colorClassMap]?.[shade] || ""
  }

  const titleColorClass = `text-${localSettings.colorTitles}-${colorOptionsTitles.find((c) => c.value === localSettings.colorTitles)?.titleShade || 700}`
  
  const paragraphColorClass = `text-${localSettings.colorParagraph}-${colorOptionsTitles.find((c) => c.value === localSettings.colorParagraph)?.paragraphShade || 600}`

  // Opciones de peso de fuente
  const weightOptions = [
    { name: "Normal", value: "font-normal" },
    { name: "Medium", value: "font-medium" },
    { name: "Semibold", value: "font-semibold" },
    { name: "Bold", value: "font-bold" },
  ]

  // Opciones de tamaño de fuente
  const sizeOptions = [
    { name: "Pequeño", value: "text-sm" },
    { name: "Mediano", value: "text-base" },
    { name: "Grande", value: "text-lg" },
    { name: "Extra grande", value: "text-xl" },
    { name: "2XL", value: "text-2xl" },
  ]

  return (
    <div>
      <form className='flex flex-col gap-4 flex-1 p-4 justify-between'>
        <div className="space-y-6">
          <div className="p-4 border border-zinc-200  rounded-xl">
            <h4 className={`${localSettings.titleSize} ${localSettings.titleWeight} mb-2 ${titleColorClass} ${localSettings.titleFont}`}>
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
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.colorTitleStage2:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.colorTitleStage2:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.colorTitleStage2:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.colorTitleStage2:""}
              </span>
            </div>
            <Select
              value={localSettings.colorTitles}
              onValueChange={(value) => handleSettingsChange("colorTitles", value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${getColorClass(localSettings.colorTitles, true)}`}></div>
                  <SelectValue placeholder="Seleccione un color" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-[300px] bg-white">
                {colorOptionsTitles.map((color) => (
                  <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${getColorClass(color.value, true)}`}></div>
                      <span>{color.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage2.es.colorParagraphStage2:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage2.en.colorParagraphStage2:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage2.pt.colorParagraphStage2:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage2.fr.colorParagraphStage2:""}
              </span>
            </div>
            <Select
              value={localSettings.colorParagraph}
              onValueChange={(value) => handleSettingsChange("colorParagraph", value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${getColorClass(localSettings.colorParagraph, false)}`}></div>
                  <SelectValue placeholder="Seleccione un color" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-[300px] bg-white">
                {colorOptionsTitles.map((color) => (
                  <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${getColorClass(color.value, false)}`}></div>
                      <span>{color.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">
                {dataLanguaje.languajeChoose === "/es/" ? "Fuente para títulos":""}
                {dataLanguaje.languajeChoose === "/en/" ? "Title font":""}
                {dataLanguaje.languajeChoose === "/pt/" ? "Fonte para títulos":""}
                {dataLanguaje.languajeChoose === "/fr/" ? "Police pour titres":""}
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
      </form>
    </div>
  )
}

export default Stage2Settings
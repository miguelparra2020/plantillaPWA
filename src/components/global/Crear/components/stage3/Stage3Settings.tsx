import React, { useState } from 'react'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { crearStore, type InfoStage3 } from 'src/stores/crearStore'
import { Palette, Square, CircleDashed, Layers } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Switch } from '../ui/switch'
import { 
  bgShadeOptionsButtons, 
  colorOptionsButtons, 
  hoverColorClassMap,
  roundedOptionsButtons,
  shadowOptionsButtons,
  borderWidthOptionsButtons,
  borderColorClassMap,
  colorClassMap,
  textColorClassMap
} from '../../helpers/helpersStage3'
import { generalConfig } from "@util/generalConfig"

const getHoverShadow = (shadow: string) => {
  if (shadow === "shadow-none") return "shadow-sm"
  if (shadow === "shadow-sm") return "shadow"
  if (shadow === "shadow") return "shadow-md"
  if (shadow === "shadow-md") return "shadow-lg"
  if (shadow === "shadow-lg") return "shadow-xl"
  if (shadow === "shadow-xl") return "shadow-2xl"
  if (shadow === "shadow-2xl") return "shadow-2xl"
  return shadow
}

const Stage3Settings = () => {
  const { data: dataLanguaje} = useStore(languajePage)
  const store = useStore(crearStore)
  const [localSettings, setLocalSettings] = useState<InfoStage3>(() => {
    return store.infoStage3 || {
      bgColor: 'blue',
      bgShade: 500,
      textColor: 'white',
      textShade: 500,
      rounded: 'rounded',
      hasBorder: false,
      borderColor: 'blue',
      borderShade: 500,
      borderWidth: 'border',
      shadow: 'shadow',
      bgButton: '',
      bgButtonSave: '',
    }
  })

  const buttonClasses = `
    px-4 py-2 font-medium
    ${localSettings?.textColor && localSettings?.textShade ? textColorClassMap[localSettings.textColor]?.[localSettings.textShade] : 'text-white'}
    ${localSettings?.rounded || 'rounded'}
    ${localSettings?.bgColor && localSettings?.bgShade ? colorClassMap[localSettings.bgColor]?.[localSettings.bgShade] : 'bg-blue-500'}
    ${localSettings?.bgColor && localSettings?.bgShade ? hoverColorClassMap[localSettings.bgColor]?.[localSettings.bgShade] : ''}
    ${localSettings?.shadow || 'shadow'}
    transition-all duration-200
    ${localSettings?.hasBorder && localSettings?.borderColor && localSettings?.borderShade ? 
      `${localSettings.borderWidth} ${borderColorClassMap[localSettings.borderColor]?.[localSettings.borderShade]}` : ""}
  `

  const hoverColorInfo = localSettings?.bgColor && localSettings?.bgShade ? 
    hoverColorClassMap[localSettings.bgColor]?.[localSettings.bgShade]?.split('-')?.[2] : ''

  const hoverShadowInfo = getHoverShadow(localSettings?.shadow || 'shadow')

  const handleSettingsChange = (key: keyof InfoStage3, value: string | number | boolean) => {
    const newSettings = { 
      ...localSettings, 
      [key]: value,
      bgButton: key === 'bgColor' || key === 'bgShade' 
        ? `bg-${key === 'bgColor' ? value : localSettings.bgColor}-${key === 'bgShade' ? value : localSettings.bgShade}` 
        : localSettings.bgButton
    }
    
    // Calcular las clases con los nuevos valores
    const currentButtonClasses = `
      px-4 py-2 font-medium
      ${newSettings?.textColor && newSettings?.textShade ? textColorClassMap[newSettings.textColor]?.[newSettings.textShade] : 'text-white'}
      ${newSettings?.rounded || 'rounded'}
      ${newSettings?.bgColor && newSettings?.bgShade ? colorClassMap[newSettings.bgColor]?.[newSettings.bgShade] : 'bg-blue-500'}
      ${newSettings?.bgColor && newSettings?.bgShade ? hoverColorClassMap[newSettings.bgColor]?.[newSettings.bgShade] : ''}
      ${newSettings?.shadow || 'shadow'}
      transition-all duration-200
      ${newSettings?.hasBorder && newSettings?.borderColor && newSettings?.borderShade ? 
        `${newSettings.borderWidth} ${borderColorClassMap[newSettings.borderColor]?.[newSettings.borderShade]}` : ""}
    `.replace(/\s+/g, ' ').trim()

    const updatedSettings = {
      ...newSettings,
      bgButtonSave: currentButtonClasses
    }
    
    setLocalSettings(updatedSettings)
    crearStore.set({ ...crearStore.get(), infoStage3: updatedSettings })
  }

  return (
    <div>
      <form className="flex flex-col gap-4 flex-1 p-4 justify-between">
        <div className="space-y-6">
          {/* Vista previa del botón */}
          <div className="p-6 flex items-center justify-center border border-zinc-200 rounded-xl">
            <button type="button" className={buttonClasses}>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.buttonExampleStage3:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.buttonExampleStage3:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.buttonExampleStage3:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.buttonExampleStage3:""}
            </button>
          </div>

          {/* Color de fondo */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.titleBgButtonStage3:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.titleBgButtonStage3:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.titleBgButtonStage3:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.titleBgButtonStage3:""}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select 
                value={localSettings.bgColor} 
                onValueChange={(value) => handleSettingsChange("bgColor", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full bg-${localSettings.bgColor}-${localSettings.bgShade}`}></div>
                    <SelectValue placeholder="Color" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {colorOptionsButtons.map((color) => (
                    <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full bg-${color.value}-${localSettings.bgShade}`}></div>
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={localSettings.bgShade.toString()}
                onValueChange={(value) => handleSettingsChange("bgShade", Number.parseInt(value))}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <SelectValue placeholder="Intensidad" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                    <SelectItem key={shade} value={shade.toString()}>
                      {shade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-xs text-zinc-500">
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.subtitleBgButtonStage3:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.subtitleBgButtonStage3:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.subtitleBgButtonStage3:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.subtitleBgButtonStage3:""} {localSettings?.bgColor || 'blue'}-{hoverColorInfo}
            </p>
          </div>

          {/* Color del texto */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">
  {dataLanguaje.languajeChoose === "/es/" ? "Color del texto" : ""}
  {dataLanguaje.languajeChoose === "/en/" ? "Text color" : ""}
  {dataLanguaje.languajeChoose === "/pt/" ? "Cor do texto" : ""}
  {dataLanguaje.languajeChoose === "/fr/" ? "Couleur du texte" : ""}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select 
                value={localSettings.textColor || 'white'} 
                onValueChange={(value) => handleSettingsChange("textColor", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full bg-${localSettings.textColor || 'white'}-${localSettings.textShade || 500}`}></div>
                    <SelectValue placeholder="Color" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {colorOptionsButtons.map((color) => (
                    <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full bg-${color.value}-${localSettings.textShade || 500}`}></div>
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={(localSettings.textShade || 500).toString()}
                onValueChange={(value) => handleSettingsChange("textShade", Number.parseInt(value))}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <SelectValue placeholder="Intensidad" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                    <SelectItem key={shade} value={shade.toString()}>
                      {shade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Border radius */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CircleDashed className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.titleRoundedButtonStage3:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.titleRoundedButtonStage3:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.titleRoundedButtonStage3:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.titleRoundedButtonStage3:""}
              </span>
            </div>
            <Select 
              value={localSettings.rounded} 
              onValueChange={(value) => handleSettingsChange("rounded", value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                <SelectValue placeholder="Redondeo" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {roundedOptionsButtons.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sombra */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.titleShadowStage3:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.titleShadowStage3:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.titleShadowStage3:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.titleShadowStage3:""}
              </span>
            </div>
            <Select 
              value={localSettings.shadow} 
              onValueChange={(value) => handleSettingsChange("shadow", value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                <SelectValue placeholder="Sombra" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {shadowOptionsButtons.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-zinc-500">
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.subtitleShadowStage3:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.subtitleShadowStage3:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.subtitleShadowStage3:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.subtitleShadowStage3:""} {hoverShadowInfo}
            </p>
          </div>

          {/* Borde */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Square className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.titleBorderStage3:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.titleBorderStage3:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.titleBorderStage3:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.titleBorderStage3:""} </span>
              </div>
              
              <Switch
                className="data-[state=checked]:bg-gray-300 border border-zinc-400 [&>span]:border [&>span]:border-zinc-400"
                style={{ transition: 'background-color 0.2s' }}
                checked={localSettings.hasBorder}
                onCheckedChange={(checked) => handleSettingsChange("hasBorder", checked)}
              /> 
            </div>

            {localSettings.hasBorder && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Select
                  value={localSettings.borderWidth}
                  onValueChange={(value) => handleSettingsChange("borderWidth", value)}
                >
                  <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                    <SelectValue placeholder="Grosor" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {borderWidthOptionsButtons.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={localSettings.borderColor}
                  onValueChange={(value) => handleSettingsChange("borderColor", value)}
                >
                  <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full bg-${localSettings.borderColor}-${localSettings.borderShade}`}></div>
                      <SelectValue placeholder="Color" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] bg-white">
                    {colorOptionsButtons.map((color) => (
                      <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full bg-${color.value}-${localSettings.borderShade}`}></div>
                          <span>{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={localSettings.borderShade.toString()}
                  onValueChange={(value) => handleSettingsChange("borderShade", Number.parseInt(value))}
                >
                  <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                    <SelectValue placeholder="Intensidad" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                      <SelectItem key={shade} value={shade.toString()}>
                        {shade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Stage3Settings
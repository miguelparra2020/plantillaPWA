import React, { useState } from 'react'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { crearStore } from 'src/stores/crearStore'
import { type InfoStage3 } from '../../interfaces/InfoStage3'
import { Palette, Square, CircleDashed, Layers, Type } from 'lucide-react'
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
  textColorClassMap,
  fontOptions,
  weightOptions,
  sizeOptions,
  shadowColorClassMap,
  hoverShadowColorClassMap
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

const getHoverClasses = (infoStage3: InfoStage3) => {
  const hoverClasses = []
  
  // Texto hover
  if (infoStage3.textColorHover && infoStage3.textShadeHover) {
    hoverClasses.push(`hover:text-${infoStage3.textColorHover}-${infoStage3.textShadeHover}`)
  }
  
  // Fondo hover
  if (infoStage3.bgColorHover && infoStage3.bgShadeHover) {
    hoverClasses.push(`hover:bg-${infoStage3.bgColorHover}-${infoStage3.bgShadeHover}`)
  }
  
  // Sombra hover
  if (infoStage3.shadow) {
    hoverClasses.push(`hover:${getHoverShadow(infoStage3.shadow)}`)
  }
  
  return hoverClasses.join(' ')
}

const Stage3Settings = () => {
  const { data: dataLanguaje} = useStore(languajePage)
  const store = useStore(crearStore)
  const infoStage3 = store.infoStage3
  const [localSettings, setLocalSettings] = useState<InfoStage3>(() => {
    const defaultSettings = {
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
      shadowColor: 'gray',
      shadowShade: 500,
      bgButton: '',
      bgButtonSave: '',
      buttonFont: '',
      buttonWeight: '',
      buttonSize: '',
      classButtonGeneral: 'px-4 py-2 text-white rounded bg-blue-500 shadow shadow-gray-500/50 transition-all duration-200'
    };

    return store.infoStage3 ? {
      ...defaultSettings,
      ...store.infoStage3
    } : defaultSettings;
  })

  const selectedBgColorOption = colorOptionsButtons.find(
    (color) => color.value === infoStage3?.bgColor
  );
  const selectedHoverColorOption = colorOptionsButtons.find(
    (color) => color.value === infoStage3?.bgColorHover
  );
  const isGradient = selectedBgColorOption?.isGradient;
  const isHoverGradient = selectedHoverColorOption?.isGradient;
  const gradientClass = selectedBgColorOption?.gradientClass || '';
  const hoverGradientClass = selectedHoverColorOption?.gradientClass || '';

  const buttonClasses = `
    px-4 py-2
    ${infoStage3?.textColor && infoStage3?.textShade ? 
      (infoStage3.textColor === 'white' ? 'text-white' : `text-${infoStage3.textColor}-${infoStage3.textShade}`) 
      : 'text-white'}
    ${infoStage3?.rounded || 'rounded'}
    ${isGradient ? `bg-gradient-to-r ${gradientClass}` : 
      (infoStage3?.bgColor && infoStage3?.bgShade ? 
        (infoStage3.bgColor === 'white' ? 'bg-white' : `bg-${infoStage3.bgColor}-${infoStage3.bgShade}`) 
        : 'bg-blue-500')}
    ${infoStage3?.shadow || 'shadow'}
    ${infoStage3?.shadowColor && infoStage3?.shadowShade ? shadowColorClassMap[infoStage3.shadowColor]?.[infoStage3.shadowShade] : 'shadow-gray-500/50'}
    ${infoStage3?.buttonFont || ''}
    ${infoStage3?.buttonWeight || ''}
    ${infoStage3?.buttonSize || ''}
    transition-all duration-200
    ${infoStage3?.hasBorder && infoStage3?.borderColor && infoStage3?.borderShade ? 
      `${infoStage3.borderWidth} border-${infoStage3.borderColor}-${infoStage3.borderShade}` : ""}
    ${infoStage3?.bgColorHover && infoStage3?.bgShadeHover ? 
      (isHoverGradient ? `hover:bg-gradient-to-r ${hoverGradientClass}` : 
        (infoStage3.bgColorHover === 'white' ? 'hover:bg-white' : `hover:bg-${infoStage3.bgColorHover}-${infoStage3.bgShadeHover}`)) 
      : ''}
    hover:${getHoverShadow(infoStage3?.shadow || 'shadow')}
  `.replace(/\s+/g, ' ').trim()

  const hoverColorInfo = infoStage3?.bgColor && infoStage3?.bgShade ? 
    hoverColorClassMap[infoStage3.bgColor]?.[infoStage3.bgShade]?.split('-')?.[2] : ''

  const hoverShadowInfo = getHoverShadow(infoStage3?.shadow || 'shadow')

  const handleSettingsChange = (key: keyof InfoStage3, value: string | number | boolean) => {
    const selectedColorOption = colorOptionsButtons.find(color => color.value === value);
    const isGradientForNewColor = selectedColorOption?.isGradient;
    const gradientClassForNewColor = selectedColorOption?.gradientClass || '';

    const newSettings = { 
      ...infoStage3, 
      [key]: value,
      bgButton: key === 'bgColor' 
        ? (isGradientForNewColor ? `bg-gradient-to-r ${gradientClassForNewColor}` : `bg-${value}-${infoStage3.bgShade}`)
        : infoStage3.bgButton
    }

    // Calcular las clases con los nuevos valores
    const currentButtonClasses = `
      px-4 py-2
      ${newSettings?.textColor && newSettings?.textShade ? 
        (newSettings.textColor === 'white' ? 'text-white' : `text-${newSettings.textColor}-${newSettings.textShade}`) 
        : 'text-white'}
      ${newSettings?.rounded || 'rounded'}
      ${isGradientForNewColor ? `bg-gradient-to-r ${gradientClassForNewColor}` : 
        (newSettings?.bgColor && newSettings?.bgShade ? 
          (newSettings.bgColor === 'white' ? 'bg-white' : `bg-${newSettings.bgColor}-${newSettings.bgShade}`) 
          : 'bg-blue-500')}
      ${newSettings?.shadow || 'shadow'}
      ${newSettings?.shadowColor && newSettings?.shadowShade ? shadowColorClassMap[newSettings.shadowColor]?.[newSettings.shadowShade] : 'shadow-gray-500/50'}
      ${newSettings?.buttonFont || ''}
      ${newSettings?.buttonWeight || ''}
      ${newSettings?.buttonSize || ''}
      transition-all duration-200
      ${newSettings?.hasBorder && newSettings?.borderColor && newSettings?.borderShade ? 
        `${newSettings.borderWidth} border-${newSettings.borderColor}-${newSettings.borderShade}` : ""}
      ${newSettings?.bgColorHover && newSettings?.bgShadeHover ? 
        (isHoverGradient ? `hover:bg-gradient-to-r ${hoverGradientClass}` : 
          (newSettings.bgColorHover === 'white' ? 'hover:bg-white' : `hover:bg-${newSettings.bgColorHover}-${newSettings.bgShadeHover}`)) 
        : ''}
      hover:${getHoverShadow(newSettings?.shadow || 'shadow')}
    `.replace(/\s+/g, ' ').trim()

    const updatedSettings = {
      ...newSettings,
      bgButtonSave: currentButtonClasses,
      classButtonGeneral: currentButtonClasses
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
              {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.buttonExampleStage3: ""}
              {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.buttonExampleStage3: ""}
              {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.buttonExampleStage3: ""}
              {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.buttonExampleStage3: ""}
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
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.titleBgButtonStage3:""}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select 
                value={infoStage3.bgColor} 
                onValueChange={(value) => handleSettingsChange("bgColor", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    {selectedBgColorOption?.isGradient ? (
                      <div className={`w-4 h-4 rounded-full ${selectedBgColorOption.gradientClass}`} />
                    ) : (
                      <div className={`w-4 h-4 rounded-full bg-${infoStage3.bgColor}-${infoStage3.bgShade}`} />
                    )}
                    <SelectValue placeholder="Color" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  <SelectItem value="white" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-white border border-zinc-200"></div>
                      <span>Blanco</span>
                    </div>
                  </SelectItem>
                  {colorOptionsButtons.map((color) => (
                    <SelectItem key={`bg-${color.value}`} value={color.value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        {color.isGradient ? (
                          <div className={`w-4 h-4 rounded-full ${color.gradientClass}`} />
                        ) : (
                          <div className={`w-4 h-4 rounded-full bg-${color.value}-${infoStage3.bgShade}`} />
                        )}
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {!selectedBgColorOption?.isGradient && (
                <Select
                  value={infoStage3.bgShade.toString()}
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
              )}
            </div>
          </div>

          {/* Color de fondo en hover */}
          {!selectedBgColorOption?.isGradient && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">
                  {dataLanguaje.languajeChoose === "/es/" ? "Color de fondo en hover" :
                  dataLanguaje.languajeChoose === "/en/" ? "Background color on hover" :
                  dataLanguaje.languajeChoose === "/pt/" ? "Cor de fundo no hover" :
                  dataLanguaje.languajeChoose === "/fr/" ? "Couleur de fond au survol" : "Color de fondo en hover"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={infoStage3.bgColorHover || infoStage3.bgColor}
                  onValueChange={(value) => handleSettingsChange("bgColorHover", value)}
                >
                  <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full bg-${infoStage3.bgColorHover || infoStage3.bgColor}-${infoStage3.bgShadeHover || infoStage3.bgShade}`}></div>
                      <SelectValue placeholder="Color" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] bg-white">
                    <SelectItem value="white" className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-white border border-zinc-200"></div>
                        <span>Blanco</span>
                      </div>
                    </SelectItem>
                    {colorOptionsButtons.filter(color => !color.isGradient).map((color) => (
                      <SelectItem key={`bgHover-${color.value}`} value={color.value} className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full bg-${color.value}-${infoStage3.bgShadeHover || infoStage3.bgShade}`}></div>
                          <span>{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={(infoStage3.bgShadeHover || infoStage3.bgShade).toString()}
                  onValueChange={(value) => handleSettingsChange("bgShadeHover", Number.parseInt(value))}
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
          )}

          {/* Color del texto */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">
                {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.titleTextColorButtonStage3:""}
                {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.titleTextColorButtonStage3:""}
                {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.titleTextColorButtonStage3:""}
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.titleTextColorButtonStage3:""} 
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select 
                value={infoStage3.textColor || 'white'} 
                onValueChange={(value) => handleSettingsChange("textColor", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full bg-${infoStage3.textColor || 'white'}-${infoStage3.textShade || 500}`}></div>
                    <SelectValue placeholder="Color" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  <SelectItem value="white" className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-white border border-zinc-200"></div>
                      <span>Blanco</span>
                    </div>
                  </SelectItem>
                  {colorOptionsButtons.filter(color => !color.isGradient).map((color) => (
                    <SelectItem key={`text-${color.value}`} value={color.value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full bg-${color.value}-${infoStage3.textShade || 500}`}></div>
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {infoStage3.textColor !== 'white' && (
                <Select
                  value={(infoStage3.textShade || 500).toString()}
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
              )}
            </div>
          </div>

          {/* Fuente del botón */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">
                {dataLanguaje.languajeChoose === "/es/" ? "Fuente del botón":""}
                {dataLanguaje.languajeChoose === "/en/" ? "Button font":""}
                {dataLanguaje.languajeChoose === "/pt/" ? "Fonte do botão":""}
                {dataLanguaje.languajeChoose === "/fr/" ? "Police du bouton":""}
              </span>
            </div>
            <Select
              value={infoStage3.buttonFont}
              onValueChange={(value) => handleSettingsChange("buttonFont", value)}
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

          {/* Peso de la fuente del botón */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">
                {dataLanguaje.languajeChoose === "/es/" ? "Peso de la fuente":""}
                {dataLanguaje.languajeChoose === "/en/" ? "Font weight":""}
                {dataLanguaje.languajeChoose === "/pt/" ? "Peso da fonte":""}
                {dataLanguaje.languajeChoose === "/fr/" ? "Poids de la police":""}
              </span>
            </div>
            <Select
              value={infoStage3.buttonWeight}
              onValueChange={(value) => handleSettingsChange("buttonWeight", value)}
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

          {/* Tamaño de la fuente del botón */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">
                {dataLanguaje.languajeChoose === "/es/" ? "Tamaño de la fuente":""}
                {dataLanguaje.languajeChoose === "/en/" ? "Font size":""}
                {dataLanguaje.languajeChoose === "/pt/" ? "Tamanho da fonte":""}
                {dataLanguaje.languajeChoose === "/fr/" ? "Taille de la police":""}
              </span>
            </div>
            <Select
              value={infoStage3.buttonSize}
              onValueChange={(value) => handleSettingsChange("buttonSize", value)}
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
              value={infoStage3.rounded} 
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
              value={infoStage3.shadow} 
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

            {/* Color de la sombra */}
            <div className="grid grid-cols-2 gap-2">
              <Select 
                value={infoStage3.shadowColor || 'gray'} 
                onValueChange={(value) => handleSettingsChange("shadowColor", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full bg-${infoStage3.shadowColor || 'gray'}-${infoStage3.shadowShade || 500}`}></div>
                    <SelectValue placeholder="Color de sombra" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {colorOptionsButtons.map((color) => (
                    <SelectItem key={`shadow-${color.value}`} value={color.value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full bg-${color.value}-${infoStage3.shadowShade || 500}`}></div>
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={(infoStage3.shadowShade || 500).toString()}
                onValueChange={(value) => handleSettingsChange("shadowShade", Number.parseInt(value))}
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

          {/* Borde */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Square className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">
                  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage3.es.titleBorderStage3:""}
                  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage3.en.titleBorderStage3:""}
                  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage3.pt.titleBorderStage3:""}
                  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage3.fr.titleBorderStage3:""} 
                </span>
              </div>
              
              <Switch
                className="data-[state=checked]:bg-gray-300 border border-zinc-400 [&>span]:border [&>span]:border-zinc-400"
                style={{ transition: 'background-color 0.2s' }}
                checked={infoStage3.hasBorder}
                onCheckedChange={(checked) => handleSettingsChange("hasBorder", checked)}
              /> 
            </div>

            {infoStage3.hasBorder && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Select
                  value={infoStage3.borderWidth}
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
                  value={infoStage3.borderColor}
                  onValueChange={(value) => handleSettingsChange("borderColor", value)}
                >
                  <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full bg-${infoStage3.borderColor}-${infoStage3.borderShade}`}></div>
                      <SelectValue placeholder="Color" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] bg-white">
                    {colorOptionsButtons.map((color) => (
                      <SelectItem key={`border-${color.value}`} value={color.value} className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full bg-${color.value}-${infoStage3.borderShade}`}></div>
                          <span>{color.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={infoStage3.borderShade.toString()}
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
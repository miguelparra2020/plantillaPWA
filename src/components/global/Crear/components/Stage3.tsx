import React from "react"
import { useState } from "react"
import { Sparkles, Palette, Square, CircleDashed, Layers } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import CardGeneral from "./CardGeneral"
import { ColorSettings, StageProps } from "../interfaces/models"
import { Switch } from "./ui/switch"

interface ButtonSettings {
  // Colores
  bgColor: string
  bgShade: number

  // Bordes
  rounded: string
  hasBorder: boolean
  borderColor: string
  borderShade: number
  borderWidth: string

  // Sombras
  shadow: string
}

const Stage3: React.FC<StageProps> = ({ totalStages, currentStage, handleNext, handlePrev }) => {
  const colorOptionsButtons = [
    { name: "Red", value: "red" },
    { name: "Orange", value: "orange" },
    { name: "Amber", value: "amber" },
    { name: "Yellow", value: "yellow" },
    { name: "Lime", value: "lime" },
    { name: "Green", value: "green" },
    { name: "Emerald", value: "emerald" },
    { name: "Teal", value: "teal" },
    { name: "Cyan", value: "cyan" },
    { name: "Sky", value: "sky" },
    { name: "Blue", value: "blue" },
    { name: "Indigo", value: "indigo" },
    { name: "Violet", value: "violet" },
    { name: "Purple", value: "purple" },
    { name: "Fuchsia", value: "fuchsia" },
    { name: "Pink", value: "pink" },
    { name: "Rose", value: "rose" },
    { name: "Slate", value: "slate" },
    { name: "Zinc", value: "zinc" },
    { name: "Gray", value: "gray" },
    { name: "Neutral", value: "neutral" },
    { name: "Stone", value: "stone" },
  ]

  const bgShadeOptionsButtons = [
    { name: "500", value: 500 },
    { name: "600", value: 600 },
    { name: "700", value: 700 },
  ]
  
  // Opciones de border radius
  const roundedOptionsButtons = [
    { name: "None", value: "rounded-none" },
    { name: "Small", value: "rounded-sm" },
    { name: "Default", value: "rounded" },
    { name: "Medium", value: "rounded-md" },
    { name: "Large", value: "rounded-lg" },
    { name: "Extra Large", value: "rounded-xl" },
    { name: "2XL", value: "rounded-2xl" },
    { name: "3XL", value: "rounded-3xl" },
    { name: "Full", value: "rounded-full" },
  ]
  
  // Opciones de ancho de borde
  const borderWidthOptionsButtons = [
    { name: "1px", value: "border" },
    { name: "2px", value: "border-2" },
    { name: "4px", value: "border-4" },
    { name: "8px", value: "border-8" },
  ]
  
  // Opciones de sombra
  const shadowOptionsButtons = [
    { name: "None", value: "shadow-none" },
    { name: "Small", value: "shadow-sm" },
    { name: "Default", value: "shadow" },
    { name: "Medium", value: "shadow-md" },
    { name: "Large", value: "shadow-lg" },
    { name: "Extra Large", value: "shadow-xl" },
    { name: "2XL", value: "shadow-2xl" },
  ]
  const progressPorcent = (currentStage / totalStages) * 100

  const [settings, setSettings] = useState<ButtonSettings>({
    bgColor: "blue",
    bgShade: 500,
    rounded: "rounded-md",
    hasBorder: false,
    borderColor: "gray",
    borderShade: 500,
    borderWidth: "border",
    shadow: "shadow",
  })




  const handleSettingsChange = <K extends keyof ButtonSettings>(key: K, value: ButtonSettings[K]) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Calcular el hover shade (2 grados más fuerte)
  const getHoverShade = (shade: number) => {
    if (shade === 500) return 700
    if (shade === 600) return 800
    if (shade === 700) return 900
    return shade + 200
  }

  // Calcular el hover shadow (1 grado más fuerte)
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

  // Generar clases para el botón de vista previa
  const buttonClasses = `
    px-4 py-2 font-medium text-white
    ${settings.rounded}
    bg-${settings.bgColor}-${settings.bgShade}
    hover:bg-${settings.bgColor}-${getHoverShade(settings.bgShade)}
    ${settings.shadow}
    hover:${getHoverShadow(settings.shadow)}
    transition-all duration-200
    ${settings.hasBorder ? `${settings.borderWidth} border-${settings.borderColor}-${settings.borderShade}` : ""}
  `

  const divChildren = (
    <div>
      <form className="flex flex-col gap-4 flex-1 p-4 justify-between">
            <div className="space-y-6">
              {/* Vista previa del botón */}
              <div className="p-6 flex items-center justify-center border border-zinc-200  rounded-xl">
                <button type="button" className={buttonClasses}>
                  Botón de ejemplo
                </button>
              </div>

              {/* Color de fondo */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-zinc-500">Color de fondo</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={settings.bgColor} onValueChange={(value) => handleSettingsChange("bgColor", value)}>
                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full bg-${settings.bgColor}-${settings.bgShade}`}></div>
                        <SelectValue placeholder="Color" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] bg-white">
                      {colorOptionsButtons.map((color) => (
                        <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full bg-${color.value}-${settings.bgShade}`}></div>
                            <span>{color.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={settings.bgShade.toString()}
                    onValueChange={(value) => handleSettingsChange("bgShade", Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                      <SelectValue placeholder="Intensidad" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {bgShadeOptionsButtons.map((shade) => (
                        <SelectItem key={shade.value} value={shade.value.toString()}>
                          {shade.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-zinc-500">
                  El hover será automáticamente {settings.bgColor}-{getHoverShade(settings.bgShade)}
                </p>
              </div>

              {/* Border radius */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CircleDashed className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-zinc-500">Redondeo de esquinas</span>
                </div>
                <Select value={settings.rounded} onValueChange={(value) => handleSettingsChange("rounded", value)}>
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
                  <span className="text-sm text-zinc-500">Sombra</span>
                </div>
                <Select value={settings.shadow} onValueChange={(value) => handleSettingsChange("shadow", value)}>
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
                  El hover aumentará la sombra a {getHoverShadow(settings.shadow)}
                </p>
              </div>

              {/* Borde */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Borde</span>
                  </div>
                  
                  <Switch
                    className="data-[state=checked]:bg-gray-300  border border-zinc-400 [&>span]:border [&>span]:border-zinc-400"
                    style={{ transition: 'background-color 0.2s' }}
                    checked={settings.hasBorder}
                    onCheckedChange={(checked) => handleSettingsChange("hasBorder", checked)}
                  /> 
                </div>

                {settings.hasBorder && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Select
                      value={settings.borderWidth}
                      onValueChange={(value) => handleSettingsChange("borderWidth", value)}
                    >
                      <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                        <SelectValue placeholder="Grosor" />
                      </SelectTrigger>
                      <SelectContent>
                        {borderWidthOptionsButtons.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={settings.borderColor}
                      onValueChange={(value) => handleSettingsChange("borderColor", value)}
                    >
                      <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full bg-${settings.borderColor}-${settings.borderShade}`}
                          ></div>
                          <SelectValue placeholder="Color" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {colorOptionsButtons.map((color) => (
                          <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-full bg-${color.value}-${settings.borderShade}`}></div>
                              <span>{color.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={settings.borderShade.toString()}
                      onValueChange={(value) => handleSettingsChange("borderShade", Number.parseInt(value))}
                    >
                      <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                        <SelectValue placeholder="Intensidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {bgShadeOptionsButtons.map((shade) => (
                          <SelectItem key={shade.value} value={shade.value.toString()}>
                            {shade.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4 p-4 rounded-xl bg-zinc-50">
              <div className="text-sm text-zinc-700">
                <p className="font-medium mb-2">Consejos para botones efectivos</p>
                <ul className="space-y-1 text-xs text-zinc-500">
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    Use colores que contrasten con el fondo de su sitio
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    Asegúrese de que el texto sea legible sobre el color de fondo
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    Los botones con bordes redondeados suelen ser más amigables
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-colors self-end"
            >
              <Sparkles className="w-4 h-4" />
              Guardar personalización
            </button>
          </form>
    </div>
  )

  return (
    <CardGeneral 
      title={`${currentStage} - Personalización de títulos y párrafos`} 
      subtitle={"Escoge la mejor opción de colores para su comercio electrónico"} 
      progress={progressPorcent} 
      children={divChildren}
    />
  )
}

export default Stage3
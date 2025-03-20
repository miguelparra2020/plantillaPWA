import React from "react"
import { useState } from "react"
import {
    Sparkles,
    Square,
    CircleDashed,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Type,
    FileText,
    Layers,
    ArrowBigLeftDash,
    ArrowBigRightDash,
  } from "lucide-react"
  import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import CardGeneral from "./CardGeneral"
import { StageProps } from "../interfaces/models"
import { Switch } from "./ui/switch"

interface CardInfoSettings {
    // Bordes
    hasBorder: boolean
    borderColor: string
    borderShade: number
    borderWidth: string
  
    // Esquinas
    rounded: string
  
    // Sombra
    shadow: string
  
    // Alineación del texto
    textAlign: "text-left" | "text-center" | "text-right"
  
    // Contenido editable para la vista previa
    title: string
    description: string
    icon: string
  }

const Stage5: React.FC<StageProps> = ({ totalStages, currentStage, handleNext, handlePrev }) => {
    const iconOptions = [
        { name: "Estrella", value: "star" },
        { name: "Corazón", value: "heart" },
        { name: "Pulgar arriba", value: "thumbs-up" },
        { name: "Verificado", value: "check-circle" },
        { name: "Bombilla", value: "lightbulb" },
        { name: "Regalo", value: "gift" },
        { name: "Calendario", value: "calendar" },
        { name: "Gráfico", value: "bar-chart" },
      ]
      
      // Definición de colores con sus valores de Tailwind
      const colorOptions = [
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
      
      // Opciones de intensidad de color
      const colorShadeOptions = [
        { name: "100", value: 100 },
        { name: "200", value: 200 },
        { name: "300", value: 300 },
        { name: "400", value: 400 },
        { name: "500", value: 500 },
        { name: "600", value: 600 },
        { name: "700", value: 700 },
        { name: "800", value: 800 },
        { name: "900", value: 900 },
      ]
      
      // Opciones de border radius
      const roundedOptions = [
        { name: "None", value: "rounded-none" },
        { name: "Small", value: "rounded-sm" },
        { name: "Default", value: "rounded" },
        { name: "Medium", value: "rounded-md" },
        { name: "Large", value: "rounded-lg" },
        { name: "Extra Large", value: "rounded-xl" },
        { name: "2XL", value: "rounded-2xl" },
        { name: "3XL", value: "rounded-3xl" },
      ]
      
      // Opciones de ancho de borde
      const borderWidthOptions = [
        { name: "1px", value: "border" },
        { name: "2px", value: "border-2" },
        { name: "4px", value: "border-4" },
        { name: "8px", value: "border-8" },
      ]
      
      // Opciones de sombra
      const shadowOptions = [
        { name: "None", value: "shadow-none" },
        { name: "Small", value: "shadow-sm" },
        { name: "Default", value: "shadow" },
        { name: "Medium", value: "shadow-md" },
        { name: "Large", value: "shadow-lg" },
        { name: "Extra Large", value: "shadow-xl" },
        { name: "2XL", value: "shadow-2xl" },
      ]
  const progressPorcent = (currentStage / totalStages) * 100

  const [settings, setSettings] = useState<CardInfoSettings>({
    hasBorder: true,
    borderColor: "gray",
    borderShade: 200,
    borderWidth: "border",
    rounded: "rounded-xl",
    shadow: "shadow-md",
    textAlign: "text-left",
    title: "Servicio Premium",
    description: "Ofrecemos la mejor calidad y atención personalizada para satisfacer todas sus necesidades.",
    icon: "star",
  })




  const handleSettingsChange = <K extends keyof CardInfoSettings>(key: K, value: CardInfoSettings[K]) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }
 // Renderizar el icono seleccionado
 const renderIcon = () => {
    switch (settings.icon) {
      case "star":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        )
      case "heart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
        )
      case "thumbs-up":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M7 10v12"></path>
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
          </svg>
        )
      case "check-circle":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        )
      case "lightbulb":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
            <path d="M9 18h6"></path>
            <path d="M10 22h4"></path>
          </svg>
        )
      case "gift":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
        )
      case "calendar":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        )
      case "bar-chart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        )
    }
  }

  // Generar clases para la card de vista previa
  const cardClasses = `
    overflow-hidden
    ${settings.rounded}
    ${settings.shadow}
    ${settings.hasBorder ? `${settings.borderWidth} border-${settings.borderColor}-${settings.borderShade}` : ""}
    bg-white dark:bg-zinc-800
  `

  // Generar clases para el texto
  const textClasses = `${settings.textAlign}`

  const divChildren = (
    <div>
      <form  className="flex flex-col gap-4 flex-1 p-4 justify-between">
            <div className="space-y-6">
              {/* Vista previa de la card */}
              <div className={cardClasses}>
                <div className="relative w-full h-48">
                  <img
                    src="https://flowbite.com/docs/images/examples/image-3@2x.jpg"
                    alt="Card preview"
                    className="object-cover"
                  />
                </div>
                <div className={`p-5 ${textClasses}`}>
                  <div className="flex flex-col items-start gap-4">
                    {settings.textAlign === "text-center" ? (
                      <div className="mx-auto">{renderIcon()}</div>
                    ) : settings.textAlign === "text-right" ? (
                      <div className="ml-auto">{renderIcon()}</div>
                    ) : (
                      renderIcon()
                    )}
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{settings.title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{settings.description}</p>
                  </div>
                </div>
              </div>

              {/* Contenido de la card */}
              <div className="space-y-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Contenido de la card</h4>

                {/* Icono */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Icono</span>
                  </div>
                  <Select value={settings.icon} onValueChange={(value) => handleSettingsChange("icon", value)}>
                    <SelectTrigger className="w-full h-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl">
                      <SelectValue placeholder="Seleccionar icono" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          {icon.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Título */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Título</span>
                  </div>
                  <input
                    type="text"
                    value={settings.title}
                    onChange={(e) => handleSettingsChange("title", e.target.value)}
                    className="w-full h-10 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm"
                    placeholder="Título de la card"
                  />
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Descripción</span>
                  </div>
                  <textarea
                    value={settings.description}
                    onChange={(e) => handleSettingsChange("description", e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm min-h-[80px]"
                    placeholder="Descripción de la card"
                  />
                </div>
              </div>

              {/* Alineación del texto */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlignLeft className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-zinc-500">Alineación del texto</span>
                </div>
                <RadioGroup
                  value={settings.textAlign}
                  onValueChange={(value) => handleSettingsChange("textAlign", value as CardInfoSettings["textAlign"])}
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text-left" id="text-left" />
                    <Label htmlFor="text-left" className="flex items-center">
                      <AlignLeft className="w-4 h-4 mr-1" /> Izquierda
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text-center" id="text-center" />
                    <Label htmlFor="text-center" className="flex items-center">
                      <AlignCenter className="w-4 h-4 mr-1" /> Centro
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text-right" id="text-right" />
                    <Label htmlFor="text-right" className="flex items-center">
                      <AlignRight className="w-4 h-4 mr-1" /> Derecha
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Border radius */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CircleDashed className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-zinc-500">Redondeo de esquinas</span>
                </div>
                <Select value={settings.rounded} onValueChange={(value) => handleSettingsChange("rounded", value)}>
                  <SelectTrigger className="w-full h-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl">
                    <SelectValue placeholder="Redondeo" />
                  </SelectTrigger>
                  <SelectContent>
                    {roundedOptions.map((option) => (
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
                  <SelectTrigger className="w-full h-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl">
                    <SelectValue placeholder="Sombra" />
                  </SelectTrigger>
                  <SelectContent>
                    {shadowOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Borde */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-zinc-500" />
                    <span className="text-sm text-zinc-500">Borde</span>
                  </div>
                  <Switch
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
                      <SelectTrigger className="w-full h-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl">
                        <SelectValue placeholder="Grosor" />
                      </SelectTrigger>
                      <SelectContent>
                        {borderWidthOptions.map((option) => (
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
                      <SelectTrigger className="w-full h-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full bg-${settings.borderColor}-${settings.borderShade}`}
                          ></div>
                          <SelectValue placeholder="Color" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        {colorOptions.map((color) => (
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
                      <SelectTrigger className="w-full h-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl">
                        <SelectValue placeholder="Intensidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {colorShadeOptions.map((shade) => (
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

            <div className="space-y-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
              <div className="text-sm text-zinc-700 dark:text-zinc-300">
                <p className="font-medium mb-2">Consejos para cards efectivas</p>
                <ul className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    Use imágenes de alta calidad que representen su producto o servicio
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    Mantenga los títulos concisos y descriptivos
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    La descripción debe comunicar claramente el valor o beneficio
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => handlePrev()}
        className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <ArrowBigLeftDash className="w-4 h-4" />
        atrás
      </button>
        <button
          type="button"
          onClick={() => handleNext()}
          className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
            <ArrowBigRightDash className="w-4 h-4" />
            Siguiente personalización
        </button>
        </div>
          </form>
    </div>
  )

  return (
    <CardGeneral 
      title={`${currentStage} - Personalización de card informativa`} 
      subtitle={"Crea impactantes tarjetas para destacar tus servicios, productos o promociones"} 
      progress={progressPorcent} 
      children={divChildren}
    />
  )
}

export default Stage5
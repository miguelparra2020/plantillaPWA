import React from "react"
import { useState } from "react"
import {
    ArrowBigLeftDash,
    ArrowBigRightDash,
    Sparkles,
    Square,
    CircleDashed,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Type,
    FileText,
    Layers,
    ImageIcon,
    ShoppingCart,
    Check,
    Palette,
    Store,
    MousePointerClick
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Card, CardContent } from "./ui/card"
import CardGeneral from "./CardGeneral"
import { StageProps } from "../interfaces/models"
import { colorClassMap, colorOptionsTitles } from "../helpers/helpersStage2"
import { useCrearContext } from "../context/CrearContext"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

type CustomizationStep =
  | "initial-question"
  | "areas-list"
  | "card-customization"
  | "intro-customization"
  | "product-card-customization"
  | "cards-inicio-web"
  | "product-detail-customization"
  | "cart-item-customization"
  | "complete"
  | "finaly-process"

const Stage4: React.FC<StageProps> = ({ totalStages, currentStage, handleNext, handlePrev }) => {
  
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
    { name: "500", value: 500 },
    { name: "600", value: 600 },
    { name: "700", value: 700 }
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


  const progressPorcent = Math.floor((currentStage / totalStages) * 100)
  const [currentStep, setCurrentStep] = useState<CustomizationStep>("initial-question")
  const [isLoading, setIsLoading] = useState(false)

  const [iconColor, setIconColor] = useState<string>('slate')
  const { settings, setSettings } = useCrearContext()

  const titleColorClassCardsInicio = `text-${settings.Stage2.titleColor}-${colorOptionsTitles.find((c) => c.value === settings.Stage2.titleColor)?.titleShade || 700}`

  const paragraphColorClassCardsInicio = `text-${settings.Stage2.paragraphColor}-${colorOptionsTitles.find((c) => c.value === settings.Stage2.paragraphColor)?.paragraphShade || 600}`

  const handleSettingsChange = (
    key: keyof typeof settings.Stage4.settingsOperative | keyof typeof settings.Stage4.cardSettings | keyof typeof settings.Stage4.cardsInicio,
    value: string | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      Stage4: {
        settingsOperative: {
          ...prev.Stage4.settingsOperative,
          ...(key in prev.Stage4.settingsOperative ? { [key]: value } : {}),
        },
        cardSettings: {
          ...prev.Stage4.cardSettings,
          ...(key in prev.Stage4.cardSettings ? { [key]: value } : {}),
        },
        cardsInicio: {
          ...prev.Stage4.cardsInicio,
          ...(key in prev.Stage4.cardsInicio ? { [key]: value } : {}),
        }
      },
    }))
  }

  const titleColorClass = `text-${settings.Stage4.cardSettings.titleColor}-${colorOptionsTitles.find((c) => c.value === settings.Stage4.cardSettings.titleColor)?.titleShade || 700}`

  const titleColorClass2 = `text-${settings.Stage4.cardSettings.titleColor}-${colorOptionsTitles.find((c) => c.value === settings.Stage4.cardSettings.titleColor)?.titleShade || 700}`

  const paragraphColorClass = `text-${settings.Stage4.cardSettings.paragraphColor}-${colorOptionsTitles.find((c) => c.value === settings.Stage4.cardSettings.paragraphColor)?.paragraphShade || 600}`

  const getColorClass = (color: string, isTitle: boolean) => {
    const colorOption = colorOptionsTitles.find((option) => option.value === color)
    if (!colorOption) return ""
    const shade = isTitle ? colorOption.titleShade : colorOption.paragraphShade
    return colorClassMap[color as keyof typeof colorClassMap]?.[shade] || ""
  }

  const colorMap = {
    amber: '#f59e0b',
    emerald: '#10b981',
    sky: '#0ea5e9',
    rose: '#f43f5e',
    slate: '#64748b',
    zinc: '#71717a',
    neutral: '#737373',
    stone: '#78716c'
  }

  const getIconColor = (color: string) => {
    return colorMap[color as keyof typeof colorMap] || color
  }


  const renderIcon = (color: string = 'currentColor') => {
    const iconColor = getIconColor(color)
    switch (settings.Stage4.cardSettings.icon) {
      case "star":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
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
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
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
            stroke={iconColor}
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
            stroke={iconColor}
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
            stroke={iconColor}
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
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 1 0-5C13 2 12 7 12 7z"></path>
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
            stroke={iconColor}
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
            stroke={iconColor}
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
      case "shopping-cart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-2 h-2"
          >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
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
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        )
    }
  }

  // Generar clases para la card de vista previa
  const cardClasses = `
    overflow-hidden
    ${settings.Stage4.cardSettings.rounded}
    ${settings.Stage4.cardSettings.shadow}
    ${settings.Stage4.cardSettings.hasBorder ? `${settings.Stage4.cardSettings.borderWidth} border-${settings.Stage4.cardSettings.borderColor}-${settings.Stage4.cardSettings.borderShade}` : ""}
    bg-white  w-[340px]
  `
  const cardClasses2 = `
    overflow-hidden
    ${settings.Stage4.cardSettings.rounded}
    ${settings.Stage4.cardSettings.shadow}
    ${settings.Stage4.cardSettings.hasBorder ? `${settings.Stage4.cardSettings.borderWidth} border-${settings.Stage4.cardSettings.borderColor}-${settings.Stage4.cardSettings.borderShade}` : ""}
    bg-white w-[70px] md:w-[120px]
  `

  const cardClasses3 = `
    overflow-hidden
    ${settings.Stage4.cardSettings.rounded}
    ${settings.Stage4.cardSettings.shadow}
    ${settings.Stage4.cardSettings.hasBorder ? `${settings.Stage4.cardSettings.borderWidth} border-${settings.Stage4.cardSettings.borderColor}-${settings.Stage4.cardSettings.borderShade}` : ""}
    bg-white w-[230px] md:w-[230px]
  `

  // Generar clases para el texto
  const textClasses = `${settings.Stage4.cardSettings.textAlign}`

  // Renderizar la pregunta inicial
  const renderInitialQuestion = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-8">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
        <ShoppingCart className="w-8 h-8" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-zinc-900">
          ¿Va a vender productos en línea a sus usuarios?
        </h3>
        <p className="text-sm text-zinc-500  max-w-xs">
          Esta información nos ayudará a personalizar su experiencia de comercio electrónico.
        </p>
      </div>

      <div className="w-full max-w-xs">
        <Select
          value={settings.Stage4.settingsOperative.sellProducts ? "si" : "no"}
          onValueChange={(value) => {
            if (value === "si") { 
              handleSettingsChange("sellProducts", true)          
            }else{
              handleSettingsChange("sellProducts", false)
            }
          }}
        >
          <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
            <SelectValue placeholder="Seleccione una opción" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="si">Sí, venderé productos en línea</SelectItem>
            <SelectItem value="no">No, no venderé productos en línea</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-row items-center justify-center gap-2">
        <button
        type="button"
        onClick={() => handlePrev()}
        className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <ArrowBigLeftDash className="w-4 h-4" />
        atrás
      </button>
      {settings.Stage4.settingsOperative.sellProducts ? (
        <button
        type="button"
        onClick={() => setCurrentStep("areas-list")}
        className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <ArrowBigRightDash className="w-4 h-4" />
        Personalizar área de productos
      </button>
      ): (
<button
          type="button"
          onClick={() => handleNext()}
          className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
            <ArrowBigRightDash className="w-4 h-4" />
            Siguiente personalización
        </button>
      )}
      
      

        </div>
      </div>
      
    </div>
  )

  // Renderizar la lista de áreas a personalizar
  const renderAreasList = () => (
    <div className="flex flex-col p-6 space-y-6">
      <div className="text-center space-y-2 mb-4">
        <h3 className="text-lg font-medium text-zinc-900 ">Áreas de personalización</h3>
        <p className="text-sm text-zinc-500 ">
          Vamos a personalizar las siguientes áreas de su tienda en línea:
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 border border-blue-200  rounded-xl bg-blue-50  flex items-start gap-3">
          <div className="mt-0.5 bg-blue-100  rounded-full p-1">
            <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-medium">
              1
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 ">
              Personalización de introducción a la compra de productos
            </h4>
            <p className="text-xs text-zinc-500  mt-1">
              Personalice la sección de introducción que aparecerá al inicio de su página de productos.
            </p>
          </div>
        </div>

        <div className="p-4 border border-blue-200  rounded-xl bg-blue-50 flex items-start gap-3">
          <div className="mt-0.5 bg-blue-100  rounded-full p-1">
            <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-medium">
              2
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 ">
              Personalización de la card de productos
            </h4>
            <p className="text-xs text-zinc-500  mt-1">
              Defina cómo se mostrarán sus productos en el catálogo de su tienda.
            </p>
          </div>
        </div>

        <div className="p-4 border border-blue-200  rounded-xl bg-blue-50  flex items-start gap-3">
          <div className="mt-0.5 bg-blue-100  rounded-full p-1">
            <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-medium">
              3
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 ">
              Personalización del detalle de producto
            </h4>
            <p className="text-xs text-zinc-500  mt-1">
              Configure la página de detalle donde los clientes verán toda la información de cada producto.
            </p>
          </div>
        </div>

        <div className="p-4 border border-blue-200  rounded-xl bg-blue-50  flex items-start gap-3">
          <div className="mt-0.5 bg-blue-100  rounded-full p-1">
            <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-medium">
              4
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 ">
              Personalización del item en el carrito de compras
            </h4>
            <p className="text-xs text-zinc-500  mt-1">
              Personalice cómo se verán los productos añadidos al carrito de compras.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
<button
        type="button"
        onClick={() => setCurrentStep("initial-question")}
        className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <ArrowBigLeftDash className="w-4 h-4" />
        atrás
      </button>
      <button
        type="button"
        onClick={() => setCurrentStep("card-customization")}
        className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        Comenzar personalización
      </button>
      </div>
    </div>
  )

  // Renderizar la personalización de la card
  const renderCardCustomization = () => (
    <form  className="flex flex-col gap-4 flex-1 p-4 justify-between items-center">
      <div className="space-y-4 p-4 rounded-xl bg-zinc-50  ">
        <div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Personzalización de card informativa</p>
          Esta tarjeta o la cantidad seleccionada aparecerá en la página de inicio de la plataforma, permitiendo a los clientes visualizar las características principales de sus productos o explorar las categorías disponibles. Estas tarjetas iniciales están diseñadas para motivar al usuario a visitar la sección de productos y descubrir más detalles.
        </div>
      </div>

      <div className="space-y-6  ">
        {/* Vista previa de la card */}
        <div className={cardClasses }>
          {settings.Stage4.cardSettings.showImage && (
            <div className="relative h-48">
              <img
                src="https://flowbite.com/docs/images/examples/image-3@2x.jpg"
                alt="Card preview"
                className="object-cover"
              />
            </div>
          )}
          <div className={`p-5 ${textClasses}`}>
            <div className="flex flex-col gap-4">
              {settings.Stage4.cardSettings.textAlign === "text-center" ? (
                <div className={`mx-auto ${getIconColor(iconColor)}`}>{renderIcon(iconColor)}</div>
              ) : settings.Stage4.cardSettings.textAlign === "text-right" ? (
                <div className={`ml-auto ${getIconColor(iconColor)}`}>{renderIcon(iconColor)}</div>
              ) : (
                <div className={getIconColor(iconColor)}>{renderIcon(iconColor)}</div>
              )}
              <span className={`text-xl font-bold ${titleColorClass}`}>{settings.Stage4.cardSettings.title}</span>
              <p className={`font-normal ${paragraphColorClass}`}>{settings.Stage4.cardSettings.description}</p>
            </div>
          </div>
        </div>

          {/* Contenido de la card */}
          <div className="space-y-4 p-4 rounded-xl bg-zinc-50 ">
          <h4 className="text-sm font-medium text-zinc-900 ">Contenido de la card</h4>

          {/* Opción para mostrar imagen */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">Mostrar imagen</span>
              </div>
              <Switch
                className="data-[state=checked]:bg-gray-300 border border-zinc-400 [&>span]:border [&>span]:border-zinc-400"
                style={{ transition: 'background-color 0.2s' }}
                checked={settings.Stage4.cardSettings.showImage}
                onCheckedChange={(checked) => handleSettingsChange("showImage", checked)}
              />
            </div>
          </div>

          {/* Color del icono */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Color del icono</span>
            </div>
            <Select
              value={iconColor}
              onValueChange={(value) => setIconColor(value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(iconColor) }}></div>
                  <SelectValue placeholder="Seleccione un color" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-[300px] bg-white">
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(color.value) }}></div>
                      <span>{color.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color del titulo de la card */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Color del título de la card</span>
            </div>
            <Select
              value={settings.Stage4.cardSettings.titleColor}
              onValueChange={(value) => handleSettingsChange("titleColor", value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${getColorClass(settings.Stage4.cardSettings.titleColor, true)}`}></div>
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

          {/* Color del detalle de la card */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Color del detalle de la card</span>
            </div>
            <Select
              value={settings.Stage4.cardSettings.paragraphColor}
              onValueChange={(value) => handleSettingsChange("paragraphColor", value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${getColorClass(settings.Stage4.cardSettings.paragraphColor, false)}`}></div>
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

        </div>

        {/* Alineación del texto */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlignLeft className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Alineación del texto</span>
          </div>
          <RadioGroup
            value={settings.Stage4.cardSettings.textAlign}
            onValueChange={(value) => handleSettingsChange("textAlign", value as typeof settings.Stage4.cardSettings.textAlign)}
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
          <Select value={settings.Stage4.cardSettings.rounded} onValueChange={(value) => handleSettingsChange("rounded", value)}>
            <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
              <SelectValue placeholder="Redondeo" />
            </SelectTrigger>
            <SelectContent className="bg-white">
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
          <Select value={settings.Stage4.cardSettings.shadow} onValueChange={(value) => handleSettingsChange("shadow", value)}>
            <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200 rounded-xl">
              <SelectValue placeholder="Sombra" />
            </SelectTrigger>
            <SelectContent className="bg-white">
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
              className="data-[state=checked]:bg-gray-300 border border-zinc-400 [&>span]:border [&>span]:border-zinc-400"
              style={{ transition: 'background-color 0.2s' }}
              checked={settings.Stage4.cardSettings.hasBorder}
              onCheckedChange={(checked) => handleSettingsChange("hasBorder", checked)}
            />
          </div>

          {settings.Stage4.cardSettings.hasBorder && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Select
                value={settings.Stage4.cardSettings.borderWidth}
                onValueChange={(value) => handleSettingsChange("borderWidth", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                  <SelectValue placeholder="Grosor" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {borderWidthOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={settings.Stage4.cardSettings.borderColor}
                onValueChange={(value) => handleSettingsChange("borderColor", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full bg-${settings.Stage4.cardSettings.borderColor}-${settings.Stage4.cardSettings.borderShade}`}
                    ></div>
                    <SelectValue placeholder="Color" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full bg-${color.value}-${settings.Stage4.cardSettings.borderShade}`}></div>
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={settings.Stage4.cardSettings.borderShade.toString()}
                onValueChange={(value) => handleSettingsChange("borderShade", Number.parseInt(value).toString())}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                  <SelectValue placeholder="Intensidad" />
                </SelectTrigger>
                <SelectContent className="bg-white">
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

      <div className="space-y-4 p-4 rounded-xl bg-zinc-50 ">
        <div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Consejos para cards de productos efectivas</p>
          <ul className="space-y-1 text-xs text-zinc-500 ">
            <li className="flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              Use imágenes de alta calidad que muestren claramente el producto
            </li>
            <li className="flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              Mantenga los títulos concisos y descriptivos
            </li>
            <li className="flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              La descripción debe destacar los beneficios principales del producto
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => setCurrentStep("initial-question")}
        className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <ArrowBigLeftDash className="w-4 h-4" />
        atrás
      </button>
        <button
          type="button"
          onClick={() => setCurrentStep("cards-inicio-web")}
          className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
            <ArrowBigRightDash className="w-4 h-4" />
            Siguiente personalización
        </button>
      </div>
    </form>
  )

  const optionsQuantityCards = [
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "7", value: 7 },
    { name: "8", value: 8 },
    { name: "9", value: 9 },
    { name: "10", value: 10 },
    { name: "11", value: 11 },
    { name: "12", value: 12 }
  ]

  const hoverColorClassMap = {
    red: { 500: 'hover:bg-red-700', 600: 'hover:bg-red-800', 700: 'hover:bg-red-900' },
    orange: { 500: 'hover:bg-orange-700', 600: 'hover:bg-orange-800', 700: 'hover:bg-orange-900' },
    amber: { 500: 'hover:bg-amber-700', 600: 'hover:bg-amber-800', 700: 'hover:bg-amber-900' },
    yellow: { 500: 'hover:bg-yellow-700', 600: 'hover:bg-yellow-800', 700: 'hover:bg-yellow-900' },
    lime: { 500: 'hover:bg-lime-700', 600: 'hover:bg-lime-800', 700: 'hover:bg-lime-900' },
    green: { 500: 'hover:bg-green-700', 600: 'hover:bg-green-800', 700: 'hover:bg-green-900' },
    emerald: { 500: 'hover:bg-emerald-700', 600: 'hover:bg-emerald-800', 700: 'hover:bg-emerald-900' },
    teal: { 500: 'hover:bg-teal-700', 600: 'hover:bg-teal-800', 700: 'hover:bg-teal-900' },
    cyan: { 500: 'hover:bg-cyan-700', 600: 'hover:bg-cyan-800', 700: 'hover:bg-cyan-900' },
    sky: { 500: 'hover:bg-sky-700', 600: 'hover:bg-sky-800', 700: 'hover:bg-sky-900' },
    blue: { 500: 'hover:bg-blue-700', 600: 'hover:bg-blue-800', 700: 'hover:bg-blue-900' },
    indigo: { 500: 'hover:bg-indigo-700', 600: 'hover:bg-indigo-800', 700: 'hover:bg-indigo-900' },
    violet: { 500: 'hover:bg-violet-700', 600: 'hover:bg-violet-800', 700: 'hover:bg-violet-900' },
    purple: { 500: 'hover:bg-purple-700', 600: 'hover:bg-purple-800', 700: 'hover:bg-purple-900' },
    fuchsia: { 500: 'hover:bg-fuchsia-700', 600: 'hover:bg-fuchsia-800', 700: 'hover:bg-fuchsia-900' },
    pink: { 500: 'hover:bg-pink-700', 600: 'hover:bg-pink-800', 700: 'hover:bg-pink-900' },
    rose: { 500: 'hover:bg-rose-700', 600: 'hover:bg-rose-800', 700: 'hover:bg-rose-900' },
    slate: { 500: 'hover:bg-slate-700', 600: 'hover:bg-slate-800', 700: 'hover:bg-slate-900' },
    zinc: { 500: 'hover:bg-zinc-700', 600: 'hover:bg-zinc-800', 700: 'hover:bg-zinc-900' },
    gray: { 500: 'hover:bg-gray-700', 600: 'hover:bg-gray-800', 700: 'hover:bg-gray-900' },
    neutral: { 500: 'hover:bg-neutral-700', 600: 'hover:bg-neutral-800', 700: 'hover:bg-neutral-900' },
    stone: { 500: 'hover:bg-stone-700', 600: 'hover:bg-stone-800', 700: 'hover:bg-stone-900' },
  } as const

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

  const borderColorClassMap = {
    red: { 500: 'border-red-500', 600: 'border-red-600', 700: 'border-red-700' },
    orange: { 500: 'border-orange-500', 600: 'border-orange-600', 700: 'border-orange-700' },
    amber: { 500: 'border-amber-500', 600: 'border-amber-600', 700: 'border-amber-700' },
    yellow: { 500: 'border-yellow-500', 600: 'border-yellow-600', 700: 'border-yellow-700' },
    lime: { 500: 'border-lime-500', 600: 'border-lime-600', 700: 'border-lime-700' },
    green: { 500: 'border-green-500', 600: 'border-green-600', 700: 'border-green-700' },
    emerald: { 500: 'border-emerald-500', 600: 'border-emerald-600', 700: 'border-emerald-700' },
    teal: { 500: 'border-teal-500', 600: 'border-teal-600', 700: 'border-teal-700' },
    cyan: { 500: 'border-cyan-500', 600: 'border-cyan-600', 700: 'border-cyan-700' },
    sky: { 500: 'border-sky-500', 600: 'border-sky-600', 700: 'border-sky-700' },
    blue: { 500: 'border-blue-500', 600: 'border-blue-600', 700: 'border-blue-700' },
    indigo: { 500: 'border-indigo-500', 600: 'border-indigo-600', 700: 'border-indigo-700' },
    violet: { 500: 'border-violet-500', 600: 'border-violet-600', 700: 'border-violet-700' },
    purple: { 500: 'border-purple-500', 600: 'border-purple-600', 700: 'border-purple-700' },
    fuchsia: { 500: 'border-fuchsia-500', 600: 'border-fuchsia-600', 700: 'border-fuchsia-700' },
    pink: { 500: 'border-pink-500', 600: 'border-pink-600', 700: 'border-pink-700' },
    rose: { 500: 'border-rose-500', 600: 'border-rose-600', 700: 'border-rose-700' },
    slate: { 500: 'border-slate-500', 600: 'border-slate-600', 700: 'border-slate-700' },
    zinc: { 500: 'border-zinc-500', 600: 'border-zinc-600', 700: 'border-zinc-700' },
    gray: { 500: 'border-gray-500', 600: 'border-gray-600', 700: 'border-gray-700' },
    neutral: { 500: 'border-neutral-500', 600: 'border-neutral-600', 700: 'border-neutral-700' },
    stone: { 500: 'border-stone-500', 600: 'border-stone-600', 700: 'border-stone-700' },
  } as const

  const colorClassMap2 = {
    red: { 500: 'bg-red-500', 600: 'bg-red-600', 700: 'bg-red-700' },
    orange: { 500: 'bg-orange-500', 600: 'bg-orange-600', 700: 'bg-orange-700' },
    amber: { 500: 'bg-amber-500', 600: 'bg-amber-600', 700: 'bg-amber-700' },
    yellow: { 500: 'bg-yellow-500', 600: 'bg-yellow-600', 700: 'bg-yellow-700' },
    lime: { 500: 'bg-lime-500', 600: 'bg-lime-600', 700: 'bg-lime-700' },
    green: { 500: 'bg-green-500', 600: 'bg-green-600', 700: 'bg-green-700' },
    emerald: { 500: 'bg-emerald-500', 600: 'bg-emerald-600', 700: 'bg-emerald-700' },
    teal: { 500: 'bg-teal-500', 600: 'bg-teal-600', 700: 'bg-teal-700' },
    cyan: { 500: 'bg-cyan-500', 600: 'bg-cyan-600', 700: 'bg-cyan-700' },
    sky: { 500: 'bg-sky-500', 600: 'bg-sky-600', 700: 'bg-sky-700' },
    blue: { 500: 'bg-blue-500', 600: 'bg-blue-600', 700: 'bg-blue-700' },
    indigo: { 500: 'bg-indigo-500', 600: 'bg-indigo-600', 700: 'bg-indigo-700' },
    violet: { 500: 'bg-violet-500', 600: 'bg-violet-600', 700: 'bg-violet-700' },
    purple: { 500: 'bg-purple-500', 600: 'bg-purple-600', 700: 'bg-purple-700' },
    fuchsia: { 500: 'bg-fuchsia-500', 600: 'bg-fuchsia-600', 700: 'bg-fuchsia-700' },
    pink: { 500: 'bg-pink-500', 600: 'bg-pink-600', 700: 'bg-pink-700' },
    rose: { 500: 'bg-rose-500', 600: 'bg-rose-600', 700: 'bg-rose-700' },
    slate: { 500: 'bg-slate-500', 600: 'bg-slate-600', 700: 'bg-slate-700' },
    zinc: { 500: 'bg-zinc-500', 600: 'bg-zinc-600', 700: 'bg-zinc-700' },
    gray: { 500: 'bg-gray-500', 600: 'bg-gray-600', 700: 'bg-gray-700' },
    neutral: { 500: 'bg-neutral-500', 600: 'bg-neutral-600', 700: 'bg-neutral-700' },
    stone: { 500: 'bg-stone-500', 600: 'bg-stone-600', 700: 'bg-stone-700' },
  } as const

  const buttonClasses = `
    px-2 md:py-1 md:px-4 font-medium text-white text-[6px] md:text-[8px] flex flex-row items-center justify-center
    ${settings.Stage3.rounded}
    ${colorClassMap2[settings.Stage3.bgColor][settings.Stage3.bgShade]}
    ${hoverColorClassMap[settings.Stage3.bgColor][settings.Stage3.bgShade]}
    ${settings.Stage3.shadow}
    hover:${getHoverShadow(settings.Stage3.shadow)}
    transition-all duration-200
    ${settings.Stage3.hasBorder ? `${settings.Stage3.borderWidth} ${borderColorClassMap[settings.Stage3.borderColor][settings.Stage3.borderShade]}` : ""}
  `

  const paragraphColorClassCardsIni = `text-${settings.Stage2.paragraphColor}-${colorOptionsTitles.find((c) => c.value === settings.Stage2.paragraphColor)?.paragraphShade || 600}`

  const renderCardsInicioWebCustomization = () => (
    <form  className="flex flex-col gap-4 flex-1 p-4 justify-between items-center">
      <div className="space-y-4 p-4 rounded-xl bg-zinc-50  ">
        <div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Personzalización visual de apariencia en el inicio web</p>
          En este apartado podrá personalizar la forma como aparecerá en el inicio de la plataforma la card o cads que personalizó, en esta o estas cards puede indicar categorias o realizar una invitación al usuario para que ingrese al área de productos
        </div>
      </div>

      {/* Contenido */}
      <div className="space-y-4 p-4 rounded-xl bg-zinc-50 ">
          <h4 className="text-sm font-medium text-zinc-900 ">Contenido invitación para ingresar al área de todos los productos</h4>
          {/* Título de la sesión de productos */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Store className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>Título de la sesión de productos</span>
            </div>
            <Input
              type='text'
              placeholder='Ejemplo: Descubre Nuestra Colección'
              value={settings.Stage4.cardsInicio.titleCardInicio}
              onChange={(e) => handleSettingsChange('titleCardInicio', e.target.value)}
              className='w-full bg-zinc-100  text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 '
            />
          </div>

          {/* Descripción */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <FileText className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>Descripción de la sesión productos</span>
            </div>
            <Textarea
              placeholder='Ejemplo: Explora una selección única de productos diseñados para ti.'
              value={settings.Stage4.cardsInicio.descriptionCardInicio}
              onChange={(e) => handleSettingsChange('descriptionCardInicio', e.target.value)}
              className='w-full bg-zinc-100  text-sm text-zinc-900  placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900  min-h-[100px]'
            />
          </div>

          {/* Nombre de botón */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <MousePointerClick className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>Nombre del botón de invitación a ver todos los productos</span>
            </div>
            <Input
              type='text'
              placeholder='Ejemplo: Descubre Nuestra Colección'
              value={settings.Stage4.cardsInicio.nameButtonCardInicio}
              onChange={(e) => handleSettingsChange('titleCardInicio', e.target.value)}
              className='w-full bg-zinc-100  text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 '
            />
          </div>

          {/* Cantidad de cards */}
          <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-zinc-500">Cantidad de cards. "Pueden ser las categorías de los productos"</span>
                </div>
                <Select
                      value={settings.Stage4.cardsInicio.quantityCards.toString()}
                      onValueChange={(value) => handleSettingsChange("quantityCards", value)}
                    >
                      <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                        <SelectValue placeholder="Intensidad" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                      {optionsQuantityCards.map((item) => (
                        <SelectItem key={item.value} value={item.value.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                      </SelectContent>
                </Select>
              </div>

          {/* Cards */}
          {settings.Stage4.cardsInicio.quantityCards > 0 ?
          Array.from({ length: settings.Stage4.cardsInicio.quantityCards }).map((_, index) => (
            <div key={index} >
              <div className="space-y-4 p-4 rounded-xl border border-gray-600 ">
                        {/* Título de la card*/}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Store className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>Título de la card {index+1}</span>
            </div>
            <Input
              type='text'
              placeholder='Ejemplo: Ofertas'
              value={settings.Stage4.cardsInicio.cardsDetails[index]?.titleCardCardsInicio || ''}
              onChange={(e) => {
                const newCardsDetails = [...settings.Stage4.cardsInicio.cardsDetails];
                newCardsDetails[index] = { ...newCardsDetails[index], titleCardCardsInicio: e.target.value };
                setSettings({
                  ...settings,
                  Stage4: {
                    ...settings.Stage4,
                    cardsInicio: {
                      ...settings.Stage4.cardsInicio,
                      cardsDetails: newCardsDetails.map((card) => ({
                        ...card,
                        titleCardCardsInicio: card.titleCardCardsInicio || ''
                      }))
                    }
                  }
                });
              }}
              className='w-full bg-zinc-100  text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 '
            />
          </div>
          </div>
            </div>
  )):null}

          
      </div>
      <div className="space-y-4 p-4 rounded-xl border border-zinc-200">
        <div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Visualización tipo WEB</p>       
        </div>

      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] w-[301px] md:h-[294px] md:w-[412px]">
    <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white">
      <div className="w-full mt-4 flex flex-col justify-center items-center">
        <h6 className={`text-sm font-medium mb-2 ${titleColorClassCardsInicio}`}>{settings.Stage4.cardsInicio.titleCardInicio}</h6>
      </div>
      {settings.Stage4.cardsInicio.quantityCards <= 1 ? <>
        <div className="flex flex-row items-center justify-center">
          <div className="w-[50%] h-[120px] md:h-[224px] flex flex-col items-center justify-center"> 
            <div className="w-[90%] pb-4 flex flex-col items-center justify-center text-center">
              <p className={`text-[8px] ${paragraphColorClassCardsIni}`}>{settings.Stage4.cardsInicio.descriptionCardInicio}</p>
            </div>

            <div className="w-[90%] pb-2 flex flex-col items-center justify-center text-center">
            <button type="button" className={buttonClasses}>
            {settings.Stage4.cardsInicio.nameButtonCardInicio} &nbsp; <ArrowBigRightDash className='w-2 md:w-3 h-4' />
                </button>
            </div>
          </div>
          <div className="w-[50%] flex flex-col items-center justify-center"> 
            <div >
                    {/* Vista previa de la card */}
                    <div className={cardClasses2 }>
                      {settings.Stage4.cardSettings.showImage && (
                        <div className="relative ">
                          <img
                            src="https://flowbite.com/docs/images/examples/image-3@2x.jpg"
                            alt="Card preview"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className={`p-1 md:p-2 ${textClasses}`}>
                        <div className="flex flex-col gap-1 md:gap-4">
                          {settings.Stage4.cardSettings.textAlign === "text-center" ? (
                            <div className={`mx-auto ${getIconColor(iconColor)}`}>{renderIcon(iconColor)}</div>
                          ) : settings.Stage4.cardSettings.textAlign === "text-right" ? (
                            <div className={`ml-auto ${getIconColor(iconColor)}`}>{renderIcon(iconColor)}</div>
                          ) : (
                            <div className={getIconColor(iconColor)}>{renderIcon(iconColor)}</div>
                          )}
                          <span className={`text-[4px] md:text-[6px] font-bold ${titleColorClass2}`}>{settings.Stage4.cardSettings.title}</span>
                          <p className={`font-normal text-[4px] md:text-[6px] ${paragraphColorClass}`}>{settings.Stage4.cardSettings.description}</p>
                        </div>
                      </div>
                    

                    </div>
            </div>

          </div>
        </div>
        
      </> : null}
      {settings.Stage4.cardsInicio.quantityCards > 1 ? <>
        <div className="flex flex-col items-center justify-center">
          <div className="w-[90%] pb-4 flex flex-col items-center justify-center text-center">
              <p className={`text-[8px] ${paragraphColorClassCardsIni}`}>{settings.Stage4.cardsInicio.descriptionCardInicio}</p>
            </div>
        </div>
      </> : null}
        </div>
        
</div>

<div className="relative mx-auto bg-gray-900  rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
    <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
</div>

<div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Visualización tipo Móvil</p>       
        </div>


<div className="relative mx-auto border-gray-800  bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
    <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
    <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
    <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white ">
      <div className="w-full mt-20 flex flex-col justify-center items-center">
        <h6 className={`text-sm font-medium mb-2 ${titleColorClassCardsInicio}`}>{settings.Stage4.cardsInicio.titleCardInicio}</h6>
      </div>
      <div className="flex mt-4 flex-col items-center justify-center">
          <div className="w-[90%] pb-4 flex flex-col items-center justify-center text-center">
              <p className={`text-[12px] ${paragraphColorClassCardsIni}`}>{settings.Stage4.cardsInicio.descriptionCardInicio}</p>
            </div>
        </div>
        <div className="flex mt-4 flex-col items-center justify-center">
            {/* Vista previa de la card */}
            <div className={cardClasses3 }>
                      {settings.Stage4.cardSettings.showImage && (
                        <div className="relative ">
                          <img
                            src="https://flowbite.com/docs/images/examples/image-3@2x.jpg"
                            alt="Card preview"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className={`p-2 md:p-4 ${textClasses}`}>
                        <div className="flex flex-col gap-2 md:gap-4">
                          {settings.Stage4.cardSettings.textAlign === "text-center" ? (
                            <div className={`mx-auto ${getIconColor(iconColor)}`}>{renderIcon(iconColor)}</div>
                          ) : settings.Stage4.cardSettings.textAlign === "text-right" ? (
                            <div className={`ml-auto ${getIconColor(iconColor)}`}>{renderIcon(iconColor)}</div>
                          ) : (
                            <div className={getIconColor(iconColor)}>{renderIcon(iconColor)}</div>
                          )}
                          <span className={`text-[6px] md:text-[8px] font-bold ${titleColorClass2}`}>{settings.Stage4.cardSettings.title}</span>
                          <p className={`font-normal text-[6px] md:text-[8px] ${paragraphColorClass}`}>{settings.Stage4.cardSettings.description}</p>
                        </div>
                      </div>
                    

            </div>
        </div>
        <div className="w-full mt-6 pb-2 flex flex-col items-center justify-center text-center">
            <button type="button" className={buttonClasses}>
            {settings.Stage4.cardsInicio.nameButtonCardInicio} &nbsp; <ArrowBigRightDash className='w-4 md:w-5 h-6' />
                </button>
        </div>
    </div>
</div>

      </div>

      

      <div className="flex flex-row items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => setCurrentStep("card-customization")}
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
  )

  // Renderizar la pantalla de completado con botón de continuar
  const renderComplete = () => (
    <div className="flex flex-col h-full p-6">
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-6">
        <div className="w-16 h-16 bg-green-100  rounded-full flex items-center justify-center text-green-600 ">
          <Check className="w-8 h-8" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-zinc-900  mb-1">¡Personalización guardada!</h3>
          <p className="text-sm text-zinc-500  max-w-xs">
            La personalización de la card informativa ha sido guardada correctamente.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 space-y-2 bg-zinc-50  rounded-xl">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Imagen</span>
            <span className="font-medium text-zinc-900 ">
              {settings.Stage4.cardSettings.showImage ? "Visible" : "Oculta"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Redondeo</span>
            <span className="font-medium text-zinc-900 ">
              {roundedOptions.find((r) => r.value === settings.Stage4.cardSettings.rounded)?.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Sombra</span>
            <span className="font-medium text-zinc-900 ">
              {shadowOptions.find((s) => s.value === settings.Stage4.cardSettings.shadow)?.name}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
          Continuar con la siguiente personalización
        </button>
      </div>
    </div>
  )

  const renderFinalyProcess =() =>(
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-8">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
        <ShoppingCart className="w-8 h-8" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-zinc-900">
        No, no venderé productos en línea
        </h3>
      </div>

      <div className="w-full max-w-xs">
        <div className="flex flex-row items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => setCurrentStep("initial-question")}
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
      </div>
      
    </div>
    
  )


  const divChildren = (
    <div>
        {currentStep === "initial-question" && renderInitialQuestion()}
        {currentStep === "areas-list" && renderAreasList()}
        {currentStep === "card-customization" && renderCardCustomization()}
        {currentStep === "cards-inicio-web" && renderCardsInicioWebCustomization()}
        {currentStep === "complete" && renderComplete()}
        {currentStep === "finaly-process" && renderFinalyProcess()}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80  flex items-center justify-center">
            <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
              <CardContent className="flex flex-col items-center gap-4 p-6">
                <div className="relative w-12 h-12">
                  <div className="w-full h-full animate-spin text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-blue-500/10 rounded-full animate-spin-slow"></div>
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-sm font-medium text-zinc-700 ">
                    Guardando su personalización...
                  </p>
                  <p className="text-xs text-zinc-500 ">Esto puede tomar unos segundos</p>
                </div>
                <div className="w-full h-1.5 bg-zinc-200  rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-300 ease-linear w-[60%]"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <br />
    </div>
  )


  return (
    <CardGeneral 
      title={`${currentStage} - Personalización de venta de productos`} 
      subtitle={"Transforme su tienda online con un diseño único que impulse sus ventas"} 
      progress={progressPorcent} 
      children={divChildren}
    />
  )
}

export default Stage4
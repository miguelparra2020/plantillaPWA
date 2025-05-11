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
    MousePointerClick,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Card, CardContent } from "./ui/card"
import CardGeneral from "./CardGeneral"
import { StageProps } from "../interfaces/models"
import { colorClassMap, colorOptionsTitles } from "../helpers/helpersStage2"
import { useCrearContext } from "../../Context/CrearContext"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { useStore } from "@nanostores/react"
import { languajePage } from "src/stores/languajePage"
import { generalConfig } from "@util/generalConfig"
import { CustomizationStep } from "../interfaces/modelsStage4"
import { RenderInitialQuestionComponent } from "./stage4/RenderInitialQuestionComponent"
import { RenderEditSelectCategories } from "./stage4/RenderEditSelectCategories"
import { crearStore } from 'src/stores/crearStore'
import { RenderCardCustomizationComponent } from "./stage4/RenderCardCustomizationComponent"
import { RendersCardsInicioWeb } from "./stage4/RendersCardsInicioWeb"
import { RenderCardsSearchInCategory } from "./stage4/RenderCardsSearchInCategory"


const Stage4: React.FC<StageProps> = ({ totalStages, currentStage, handleNext, handlePrev }) => {
  const { data: dataLanguaje} = useStore(languajePage)
  const store = useStore(crearStore)
  
  
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


  

  
 

  

  // Renderizar la pregunta inicial
  const renderInitialQuestion = () => (
    <RenderInitialQuestionComponent setCurrentStep={setCurrentStep} handlePrev={handlePrev}/>
    )

    // Renderizar la edicción de selección de categorias
  const renderEditSelectCategories = () => (
    <RenderEditSelectCategories setCurrentStep={setCurrentStep} handlePrev={handlePrev}/>
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
    <RenderCardCustomizationComponent setCurrentStep={setCurrentStep} handlePrev={handlePrev} />
  )

  

  

  

  
  

  

  const renderCardsInicioWebCustomization = () => (
   <RendersCardsInicioWeb setCurrentStep={setCurrentStep} handlePrev={handlePrev} />
  )

  const renderCardsSearchInCategory = () => (
    <RenderCardsSearchInCategory setCurrentStep={setCurrentStep} handlePrev={handlePrev} />
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
              {store.infoStage4.cardSettings.showImage ? "Visible" : "Oculta"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Redondeo</span>
            <span className="font-medium text-zinc-900 ">
              {roundedOptions.find((r) => r.value === store.infoStage4.cardSettings.rounded)?.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Sombra</span>
            <span className="font-medium text-zinc-900 ">
              {shadowOptions.find((s) => s.value === store.infoStage4.cardSettings.shadow)?.name}
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
        {currentStep === "edit-select-categories" && renderEditSelectCategories()}
        {currentStep === "areas-list" && renderAreasList()}
        {currentStep === "card-customization" && renderCardCustomization()}
        {currentStep === "cards-inicio-web" && renderCardsInicioWebCustomization()}
        {currentStep === "cards-search-in-category" && renderCardsSearchInCategory()}
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
      title={`${currentStage} -  
        ${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.titleStage4:""}
        ${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.titleStage4:""}
        ${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.titleStage4:""}
        ${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.titleStage4:""}`}  
      subtitle={`  
        ${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage4.es.subtitleStage4:""}
        ${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage4.en.subtitleStage4:""}
        ${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage4.pt.subtitleStage4:""}
        ${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage4.fr.subtitleStage4:""}`} 
      progress={progressPorcent} 
      children={divChildren}
    />
  )
}

export default Stage4
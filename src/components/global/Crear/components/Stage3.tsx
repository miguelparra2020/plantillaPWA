import  React from "react"

import { useState } from "react"
import { Sparkles, Palette, Type } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import CardGeneral from "./CardGeneral"
import { ColorSettings, StageProps } from "../interfaces/models"
import { colorOptionsTitles } from "../helpers/helpers"





const Stage3 : React.FC<StageProps> = ({ totalStages, currentStage, handleNext, handlePrev }) => {
  const progressPorcent = (currentStage / totalStages) * 100
  const [settings, setSettings] = useState<ColorSettings>({
    titleColor: "blue",
    paragraphColor: "slate",
  })


  const handleSettingsChange = (key: keyof ColorSettings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Función para obtener la clase de color de Tailwind
  const getColorClass = (color: string, isTitle: boolean) => {
    const colorOption = colorOptionsTitles.find((option) => option.value === color)
    if (!colorOption) return ""
    const shade = isTitle ? colorOption.titleShade : colorOption.paragraphShade
    return `bg-${color}-${shade}`
  }

 //  Ejemplo de cómo se verían los títulos y párrafos con los colores seleccionados
  const titleColorClass = `text-${settings.titleColor}-${colorOptionsTitles.find((c) => c.value === settings.titleColor)?.titleShade || 700}`
  const paragraphColorClass = `text-${settings.paragraphColor}-${colorOptionsTitles.find((c) => c.value === settings.paragraphColor)?.paragraphShade || 600}`

  const divChildren = (
    <div>
      <form className="flex flex-col gap-4 flex-1 p-4 justify-between">
        <div className="space-y-6">
               {/* Color para títulos */}
               <div className="space-y-2">
                 <div className="flex items-center gap-2">
                   <Type className="w-4 h-4 text-zinc-500" />
                   <span className="text-sm text-zinc-500">Color para títulos</span>
                 </div>
                 <Select
                   value={settings.titleColor}
                   onValueChange={(value) => handleSettingsChange("titleColor", value)}
                 >
                   <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                     <div className="flex items-center gap-2">
                       <div className={`w-4 h-4 rounded-full ${getColorClass(settings.titleColor, true)}`}></div>
                       <SelectValue placeholder="Seleccione un color" />
                     </div>
                   </SelectTrigger>
                   <SelectContent className="max-h-[300px] bg-white">
                     {colorOptionsTitles.map((color) => (
                       <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                         <div className="flex items-center gap-2">
                           <div className={`w-4 h-4 rounded-full bg-${color.value}-${color.titleShade}`}></div>
                           <span>{color.name}</span>
                         </div>
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>

               {/* Color para párrafos */}
               <div className="space-y-2">
                 <div className="flex items-center gap-2">
                   <Palette className="w-4 h-4 text-zinc-500" />
                   <span className="text-sm text-zinc-500">Color para párrafos</span>
                 </div>
                 <Select
                   value={settings.paragraphColor}
                   onValueChange={(value) => handleSettingsChange("paragraphColor", value)}
                 >
                   <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                     <div className="flex items-center gap-2">
                       <div className={`w-4 h-4 rounded-full ${getColorClass(settings.paragraphColor, false)}`}></div>
                       <SelectValue placeholder="Seleccione un color" />
                     </div>
                   </SelectTrigger>
                   <SelectContent className="max-h-[300px] bg-white">
                     {colorOptionsTitles.map((color) => (
                       <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                         <div className="flex items-center gap-2">
                           <div className={`w-4 h-4 rounded-full bg-${color.value}-${color.paragraphShade}`}></div>
                           <span>{color.name}</span>
                         </div>
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>

               {/* Vista previa */}
               <div className="p-4 border border-zinc-200  rounded-xl">
                 <h4 className={`text-lg font-medium mb-2 ${titleColorClass}`}>Vista previa de título</h4>
                 <p className={`text-sm ${paragraphColorClass}`}>
                   Este es un ejemplo de cómo se verán los párrafos en su tienda con el color seleccionado. La elección
                   de colores adecuados mejora la experiencia de usuario y refuerza su identidad de marca.
                 </p>
               </div>
             </div>

             <div className="space-y-4 p-4 rounded-xl bg-zinc-50 ">
               <div className="text-sm text-zinc-700 ">
                 <p className="font-medium mb-2">Consejos para elegir colores</p>
                 <ul className="space-y-1 text-xs text-zinc-500 ">
                   <li className="flex items-center gap-1">
                     <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                     Use colores que reflejen la personalidad de su marca
                   </li>
                   <li className="flex items-center gap-1">
                     <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                     Asegúrese de que haya suficiente contraste para la legibilidad
                   </li>
                   <li className="flex items-center gap-1">
                     <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                     Considere la accesibilidad para todos los usuarios
                   </li>
                 </ul>
               </div>
             </div>

             <button
               type="submit"
               className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors self-end"
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
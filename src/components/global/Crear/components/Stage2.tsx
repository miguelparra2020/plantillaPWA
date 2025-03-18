import React from "react"
import { useState } from "react"
import { Sparkles, Palette, Type } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import CardGeneral from "./CardGeneral"
import { ColorSettings, StageProps } from "../interfaces/models"

const Stage2: React.FC<StageProps> = ({ totalStages, currentStage, handleNext, handlePrev }) => {
  const colorOptionsTitles = [
    { name: "Red", value: "red", titleShade: 700, paragraphShade: 600 },
    { name: "Orange", value: "orange", titleShade: 700, paragraphShade: 600 },
    { name: "Amber", value: "amber", titleShade: 700, paragraphShade: 600 },
    { name: "Yellow", value: "yellow", titleShade: 700, paragraphShade: 600 },
    { name: "Lime", value: "lime", titleShade: 700, paragraphShade: 600 },
    { name: "Green", value: "green", titleShade: 800, paragraphShade: 600 },
    { name: "Emerald", value: "emerald", titleShade: 900, paragraphShade: 600 },
    { name: "Teal", value: "teal", titleShade: 700, paragraphShade: 600 },
    { name: "Cyan", value: "cyan", titleShade: 800, paragraphShade: 600 },
    { name: "Sky", value: "sky", titleShade: 900, paragraphShade: 600 },
    { name: "Blue", value: "blue", titleShade: 900, paragraphShade: 600 },
    { name: "Indigo", value: "indigo", titleShade: 700, paragraphShade: 600 },
    { name: "Violet", value: "violet", titleShade: 800, paragraphShade: 600 },
    { name: "Purple", value: "purple", titleShade: 800, paragraphShade: 600 },
    { name: "Fuchsia", value: "fuchsia", titleShade: 900, paragraphShade: 600 },
    { name: "Pink", value: "pink", titleShade: 800, paragraphShade: 600 },
    { name: "Rose", value: "rose", titleShade: 800, paragraphShade: 600 },
    { name: "Slate", value: "slate", titleShade: 700, paragraphShade: 600 },
    { name: "Gray", value: "gray", titleShade: 700, paragraphShade: 600 },
    { name: "Zinc", value: "zinc", titleShade: 700, paragraphShade: 600 },
    { name: "Neutral", value: "neutral", titleShade: 900, paragraphShade: 600 },
    { name: "Stone", value: "stone", titleShade: 700, paragraphShade: 600 },
  ]
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

  const colorClassMap = {
    red: {
      700: "bg-red-700",
      600: "bg-red-600",
    },
    orange: {
      700: "bg-orange-700",
      600: "bg-orange-600",
    },
    amber: {
      700: "bg-amber-700",
      600: "bg-amber-600",
    },
    yellow: {
      700: "bg-yellow-700",
      600: "bg-yellow-600",
    },
    lime: {
      700: "bg-lime-700",
      600: "bg-lime-600",
    },
    green: {
      800: "bg-green-800",
      600: "bg-green-600",
    },
    emerald: {
      900: "bg-emerald-900",
      600: "bg-emerald-600",
    },
    teal: {
      700: "bg-teal-700",
      600: "bg-teal-600",
    },
    cyan: {
      800: "bg-cyan-800",
      600: "bg-cyan-600",
    },
    sky: {
      900: "bg-sky-900",
      600: "bg-sky-600",
    },
    blue: {
      900: "bg-blue-900",
      600: "bg-blue-600",
    },
    indigo: {
      700: "bg-indigo-700",
      600: "bg-indigo-600",
    },
    violet: {
      800: "bg-violet-800",
      600: "bg-violet-600",
    },
    purple: {
      800: "bg-purple-800",
      600: "bg-purple-600",
    },
    fuchsia: {
      900: "bg-fuchsia-900",
      600: "bg-fuchsia-600",
    },
    pink: {
      800: "bg-pink-800",
      600: "bg-pink-600",
    },
    rose: {
      800: "bg-rose-800",
      600: "bg-rose-600",
    },
    slate: {
      700: "bg-slate-700",
      600: "bg-slate-600",
    },
    gray: {
      700: "bg-gray-700",
      600: "bg-gray-600",
    },
    zinc: {
      700: "bg-zinc-700",
      600: "bg-zinc-600",
    },
    neutral: {
      900: "bg-neutral-900",
      600: "bg-neutral-600",
    },
    stone: {
      700: "bg-stone-700",
      600: "bg-stone-600",
    },
  }

  const getColorClass = (color: string, isTitle: boolean) => {
    const colorOption = colorOptionsTitles.find((option) => option.value === color)
    if (!colorOption) return ""
    const shade = isTitle ? colorOption.titleShade : colorOption.paragraphShade
    return colorClassMap[color as keyof typeof colorClassMap]?.[shade] || ""
  }

  const titleColorClass = `text-${settings.titleColor}-${colorOptionsTitles.find((c) => c.value === settings.titleColor)?.titleShade || 700}`
  const paragraphColorClass = `text-${settings.paragraphColor}-${colorOptionsTitles.find((c) => c.value === settings.paragraphColor)?.paragraphShade || 600}`

  const divChildren = (
    <div>
      <form className="flex flex-col gap-4 flex-1 p-4 justify-between">
        <div className="space-y-6">
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
                      <div className={`w-4 h-4 rounded-full ${getColorClass(color.value, false)}`}></div>
                      <span>{color.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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

export default Stage2
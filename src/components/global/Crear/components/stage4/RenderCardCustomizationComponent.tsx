import * as React from 'react'
import { crearStore } from 'src/stores/crearStore'
import { useStore } from "@nanostores/react"
import { AlignCenter, AlignLeft, AlignRight, ArrowBigLeftDash, ArrowBigRightDash, CircleDashed, FileText, ImageIcon, Layers, Palette, Square, Type, Star, Heart, ThumbsUp, CheckCircle, Lightbulb, Gift, Calendar, BarChart, ShoppingCart, Circle, ClipboardCheck } from 'lucide-react'
import { Switch } from "../ui/switch"
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { colorClassMap, colorOptionsTitles } from '../../helpers/helpersStage2'
import { Label } from '../ui/label'
import { RenderInitialQuestionComponentProps, CardInicioSettings } from '../../interfaces/modelsStage4'
export const RenderCardCustomizationComponent = ({ setCurrentStep, handlePrev }: RenderInitialQuestionComponentProps) => {
    const store = useStore(crearStore)
    const [iconColor, setIconColor] = React.useState<string>('slate')
    const [iconShade, setIconShade] = React.useState<number>(500)

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

    const cardClassInitHome = `
overflow-hidden
${store.infoStage4.cardSettings.rounded}
${store.infoStage4.cardSettings.shadow}
${store.infoStage4.cardSettings.hasBorder ? `${store.infoStage4.cardSettings.borderWidth} border-${store.infoStage4.cardSettings.borderColor}-${store.infoStage4.cardSettings.borderShade}` : ""}
bg-white  w-[340px]
`
const textCardClassInitHome = `${store.infoStage4.cardSettings.textAlign}`

const getIconColor = (color: string, shade: number) => {
    return colorMap[color as keyof typeof colorMap] || color
}


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
  const titleColorClass = `text-${store.infoStage4.cardSettings.titleColor}-${colorOptionsTitles.find((c) => c.value === store.infoStage4.cardSettings.titleColor)?.titleShade || 700}`

  const paragraphColorClass = `text-${store.infoStage4.cardSettings.paragraphColor}-${colorOptionsTitles.find((c) => c.value === store.infoStage4.cardSettings.paragraphColor)?.paragraphShade || 600}`

  const handleSettingsChange = (
    key: keyof typeof store.infoStage4.cardSettings | keyof typeof store.infoStage4.cardsInicio | keyof CardInicioSettings,
    value: string | boolean | number
  ) => {
    const currentState = crearStore.get()
    const selectedCategory = currentState.infoStage4?.categorySelectToEdit

    if (selectedCategory) {
      // Actualizar las propiedades de cardInicioSettings de la categoría seleccionada
      const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
        if (cat.id === selectedCategory.id) {
          return {
            ...cat,
            cardInicioSettings: {
              ...cat.cardInicioSettings,
              [key]: value
            }
          }
        }
        return cat
      })

      crearStore.set({
        ...currentState,
        infoStage4: {
          ...currentState.infoStage4,
          businessCategories: updatedCategories,
          categorySelectToEdit: {
            ...selectedCategory,
            cardInicioSettings: {
              ...selectedCategory.cardInicioSettings,
              [key]: value
            }
          }
        }
      })
    } else {
      // Mantener la lógica existente para otras propiedades
      if (key in store.infoStage4.cardSettings) {
        crearStore.set({
          ...store,
          infoStage4: {
            ...store.infoStage4,
            cardSettings: {
              ...store.infoStage4.cardSettings,
              [key]: value
            }
          }
        })
      } else if (key in store.infoStage4.cardsInicio) {
        crearStore.set({
          ...store,
          infoStage4: {
            ...store.infoStage4,
            cardsInicio: {
              ...store.infoStage4.cardsInicio,
              [key]: value
            }
          }
        })
      }
    }
  }

  const getColorClass = (color: string, isTitle: boolean) => {
    const colorOption = colorOptionsTitles.find((option) => option.value === color)
    if (!colorOption) return ""
    const shade = isTitle ? colorOption.titleShade : colorOption.paragraphShade
    return colorClassMap[color as keyof typeof colorClassMap]?.[shade] || ""
  }

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

  const shadowOptions = [
    { name: "None", value: "shadow-none" },
    { name: "Small", value: "shadow-sm" },
    { name: "Default", value: "shadow" },
    { name: "Medium", value: "shadow-md" },
    { name: "Large", value: "shadow-lg" },
    { name: "Extra Large", value: "shadow-xl" },
    { name: "2XL", value: "shadow-2xl" },
  ]

  const borderWidthOptions = [
    { name: "1px", value: "border" },
    { name: "2px", value: "border-2" },
    { name: "4px", value: "border-4" },
    { name: "8px", value: "border-8" },
  ]

  const colorShadeOptions = [
    { name: "500", value: 500 },
    { name: "600", value: 600 },
    { name: "700", value: 700 }
  ]
    return(<>
    <form  className="flex flex-col gap-4 flex-1 p-4 justify-between items-center">
      <h1>Personalizando la categoría: <br /><strong>{store.infoStage4.categorySelectToEdit.title}</strong></h1>
      <div className="space-y-4 p-4 rounded-xl bg-zinc-50  ">
        <div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Personzalización de card informativa</p>
          Esta tarjeta o la cantidad seleccionada aparecerá en la página de inicio de la plataforma, permitiendo a sus usuarios visualizar las características principales de la categoría. Estas tarjetas iniciales están diseñadas para motivar al usuario a visitar la sección de la categoría y descubrir más detalles.
        </div>
      </div>

      <div className="space-y-6  ">
        {/* Vista previa de la card */}
        <div className={cardClassInitHome}>
          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && (
            <div className="relative h-48">
              <img
                src="https://flowbite.com/docs/images/examples/image-3@2x.jpg"
                alt="Card preview"
                className="object-cover"
              />
            </div>
          )}
          <div className={`p-5 ${textCardClassInitHome}`}>
            <div className="flex flex-col gap-4">
              {store.infoStage4.cardSettings.textAlign === "text-center" ? (
                <div className="mx-auto">
                  <ClipboardCheck className={`w-8 h-8 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />
                </div>
              ) : store.infoStage4.cardSettings.textAlign === "text-right" ? (
                <div className="ml-auto">
                  <ClipboardCheck className={`w-8 h-8 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />
                </div>
              ) : (
                <div>
                  <ClipboardCheck className={`w-8 h-8 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />
                </div>
              )}
              <span className={`text-xl font-bold ${titleColorClass}`}>{store.infoStage4.cardSettings.title}</span>
              <p className={`font-normal ${paragraphColorClass}`}>{store.infoStage4.cardSettings.description}</p>
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
                checked={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage || false}
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
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}
                onValueChange={(value) => handleSettingsChange("iconColor", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate', store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500) }}></div>
                    <SelectValue placeholder="Seleccione un color" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(color.value, store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500) }}></div>
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade?.toString() || '500'}
                onValueChange={(value) => handleSettingsChange("iconColorShade", Number.parseInt(value))}
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

          {/* Color del titulo de la card */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Color del título de la card</span>
            </div>
            <Select
              value={store.infoStage4.cardSettings.titleColor}
              onValueChange={(value) => handleSettingsChange("titleColor", value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${getColorClass(store.infoStage4.cardSettings.titleColor, true)}`}></div>
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
              value={store.infoStage4.cardSettings.paragraphColor}
              onValueChange={(value) => handleSettingsChange("paragraphColor", value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${getColorClass(store.infoStage4.cardSettings.paragraphColor, false)}`}></div>
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
            value={store.infoStage4.cardSettings.textAlign}
            onValueChange={(value) => handleSettingsChange("textAlign", value as typeof store.infoStage4.cardSettings.textAlign)}
            className="flex space-x-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text-left" id="text-left" />
              <Label  className="flex items-center">
                <AlignLeft className="w-4 h-4 mr-1" /> Izquierda
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text-center" id="text-center" />
              <Label  className="flex items-center">
                <AlignCenter className="w-4 h-4 mr-1" /> Centro
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text-right" id="text-right" />
              <Label  className="flex items-center">
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
          <Select value={store.infoStage4.cardSettings.rounded} onValueChange={(value) => handleSettingsChange("rounded", value)}>
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
          <Select value={store.infoStage4.cardSettings.shadow} onValueChange={(value) => handleSettingsChange("shadow", value)}>
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
              checked={store.infoStage4.cardSettings.hasBorder}
              onCheckedChange={(checked) => handleSettingsChange("hasBorder", checked)}
            />
          </div>

          {store.infoStage4.cardSettings.hasBorder && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Select
                value={store.infoStage4.cardSettings.borderWidth}
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
                value={store.infoStage4.cardSettings.borderColor}
                onValueChange={(value) => handleSettingsChange("borderColor", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full bg-${store.infoStage4.cardSettings.borderColor}-${store.infoStage4.cardSettings.borderShade}`}
                    ></div>
                    <SelectValue placeholder="Color" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full bg-${color.value}-${store.infoStage4.cardSettings.borderShade}`}></div>
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={store.infoStage4.cardSettings.borderShade.toString()}
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
          <p className="font-medium mb-2">Consejos para cards efectivas</p>
          <ul className="space-y-1 text-xs text-zinc-500 ">
            <li className="flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              Use imágenes de alta calidad que muestren claramente la categoría
            </li>
            <li className="flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              Mantenga los títulos concisos y descriptivos
            </li>
            <li className="flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              La descripción debe destacar los beneficios principales de la categoría
            </li>
          </ul>
        </div>
      </div>

     <div className="flex flex-row items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => setCurrentStep("edit-select-categories")}
        className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <ArrowBigLeftDash className="w-4 h-4" />
        atrás
      </button>
        <button
          type="button"
        //   onClick={() => setCurrentStep("cards-inicio-web")}
          className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
            <ArrowBigRightDash className="w-4 h-4" />
            Siguiente personalización
        </button>
      </div> 
    </form>
    </>)

}
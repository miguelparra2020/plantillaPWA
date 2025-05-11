import * as React from 'react'
import { crearStore } from 'src/stores/crearStore'
import { useStore } from "@nanostores/react"
import { 
  AlignCenter, 
  AlignLeft, 
  AlignRight, 
  ArrowBigLeftDash, 
  ArrowBigRightDash, 
  CircleDashed, 
  FileText, 
  ImageIcon, 
  Layers, 
  Palette, 
  Square, 
  Type, 
  Star, 
  Heart, 
  ThumbsUp, 
  CheckCircle, 
  Lightbulb, 
  Gift, 
  Calendar, 
  BarChart, 
  ShoppingCart, 
  Circle, 
  ClipboardCheck,
  Store,
  Sparkles,
  Package,
  Tag,
  Percent,
  Trophy,
  Award,
  Bell,
  Bookmark,
  Box,
  Briefcase,
  Building,
  Camera,
  Car,
  Coffee,
  Compass,
  CreditCard,
  Diamond,
  Flag,
  Globe,
  Home,
  Key,
  Map,
  Music,
  Phone,
  Plane,
  Rocket,
  Shield,
  Smile,
  Sun,
  Target,
  Umbrella,
  Users,
  Video,
  Watch,
  Zap
} from 'lucide-react'
import { Switch } from "../ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group'
import { colorClassMap, colorOptionsTitles } from '../../helpers/helpersStage2'
import { Label } from '../ui/label'
import { RenderInitialQuestionComponentProps, CardInicioSettings } from '../../interfaces/modelsStage4'

export const RenderCardCustomizationComponent = ({ setCurrentStep, handlePrev }: RenderInitialQuestionComponentProps) => {
    const store = useStore(crearStore)

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
${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.rounded || 'rounded-lg'}
${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.shadow || 'shadow-md'}
${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.hasBorder ? `${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderWidth || 'border'} border-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderShade || '500'}` : ""}
bg-white w-[340px]
    `
    const textCardClassInitHome = `${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign || 'text-left'}`

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

    const handleSettingsChange = (
      key: keyof CardInicioSettings | 'iconBgColor' | 'iconBgShade' | 'iconColor' | 'iconColorShade',
      value: string | boolean | number
    ) => {
      const currentState = crearStore.get()
      const selectedCategory = currentState.infoStage4?.categorySelectToEdit

      if (selectedCategory) {
        const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
          if (cat.id === selectedCategory.id) {
            return {
              ...cat,
              cardInicioSettings: {
                ...cat.cardInicioSettings,
                [key]: value,
              },
            }
          }
          return cat
        })

        const updatedState = {
          ...currentState,
          infoStage4: {
            ...currentState.infoStage4,
            businessCategories: updatedCategories,
            categorySelectToEdit: {
              ...selectedCategory,
              cardInicioSettings: {
                ...selectedCategory.cardInicioSettings,
                [key]: value,
              },
            },
          },
        }

        crearStore.set(updatedState)
        localStorage.setItem('crearStore', JSON.stringify(updatedState))
      }
    }

    // Array de opciones de iconos
    const iconOptions = [
      { name: "Estrella", value: "star", icon: Star },
      { name: "Corazón", value: "heart", icon: Heart },
      { name: "Pulgar arriba", value: "thumbs-up", icon: ThumbsUp },
      { name: "Check", value: "check-circle", icon: CheckCircle },
      { name: "Bombilla", value: "lightbulb", icon: Lightbulb },
      { name: "Regalo", value: "gift", icon: Gift },
      { name: "Calendario", value: "calendar", icon: Calendar },
      { name: "Gráfico", value: "bar-chart", icon: BarChart },
      { name: "Carrito", value: "shopping-cart", icon: ShoppingCart },
      { name: "Tienda", value: "store", icon: Store },
      { name: "Chispas", value: "sparkles", icon: Sparkles },
      { name: "Paquete", value: "package", icon: Package },
      { name: "Etiqueta", value: "tag", icon: Tag },
      { name: "Porcentaje", value: "percent", icon: Percent },
      { name: "Trofeo", value: "trophy", icon: Trophy },
      { name: "Premio", value: "award", icon: Award },
      { name: "Campana", value: "bell", icon: Bell },
      { name: "Marcador", value: "bookmark", icon: Bookmark },
      { name: "Caja", value: "box", icon: Box },
      { name: "Maletín", value: "briefcase", icon: Briefcase },
      { name: "Edificio", value: "building", icon: Building },
      { name: "Cámara", value: "camera", icon: Camera },
      { name: "Carro", value: "car", icon: Car },
      { name: "Café", value: "coffee", icon: Coffee },
      { name: "Brújula", value: "compass", icon: Compass },
      { name: "Tarjeta", value: "credit-card", icon: CreditCard },
      { name: "Diamante", value: "diamond", icon: Diamond },
      { name: "Bandera", value: "flag", icon: Flag },
      { name: "Globo", value: "globe", icon: Globe },
      { name: "Casa", value: "home", icon: Home },
      { name: "Llave", value: "key", icon: Key },
      { name: "Mapa", value: "map", icon: Map },
      { name: "Música", value: "music", icon: Music },
      { name: "Teléfono", value: "phone", icon: Phone },
      { name: "Avión", value: "plane", icon: Plane },
      { name: "Cohete", value: "rocket", icon: Rocket },
      { name: "Escudo", value: "shield", icon: Shield },
      { name: "Sonrisa", value: "smile", icon: Smile },
      { name: "Sol", value: "sun", icon: Sun },
      { name: "Objetivo", value: "target", icon: Target },
      { name: "Paraguas", value: "umbrella", icon: Umbrella },
      { name: "Usuarios", value: "users", icon: Users },
      { name: "Video", value: "video", icon: Video },
      { name: "Reloj", value: "watch", icon: Watch },
      { name: "Rayo", value: "zap", icon: Zap }
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
                className="object-cover w-full h-full"
              />
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                {(() => {
                  const IconComponent = iconOptions.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.icon)?.icon || Star;
                  return (
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconBgColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconBgShade || 500} shadow-lg`}>
                      <IconComponent className={`w-5 h-5 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'white'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
          <div className={`p-5 ${textCardClassInitHome}`}>
            <div className="flex flex-col gap-4">
              {!store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && (
                <div className={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === "text-center" ? "mx-auto" : 
                     store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === "text-right" ? "ml-auto" : ""}>
                  {(() => {
                    const IconComponent = iconOptions.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.icon)?.icon || Star;
                    return (
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconBgColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconBgShade || 500} shadow-lg`}>
                        <IconComponent className={`w-5 h-5 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'white'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />
                      </div>
                    );
                  })()}
                </div>
              )}
              <span className={`text-2xl ${store.infoStage2?.titleFont || 'font-roboto'} ${store.infoStage2?.titleWeight || 'font-black'} text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorCard || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorShadeCard || 500}`}>
                {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.title || 'Título de la tarjeta'}
              </span>
              <p className={`${store.infoStage2?.paragraphFont || 'font-poppins'} ${store.infoStage2?.paragraphWeight || 'font-normal'} ${store.infoStage2?.paragraphSize || 'text-base'} text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorCard || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorShadeCard || 500}`}>
                {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.description || 'Descripción de la tarjeta'}
              </p>
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
              onCheckedChange={(checked) => handleSettingsChange('showImage', checked)}
            />
          </div>
        </div>
        {/* Selección de icono */}
        {/* <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Icono de la card</span>
          </div>
          <Select
            value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.icon || 'star'}
            onValueChange={(value) => handleSettingsChange("icon", value)}
          >
            <SelectTrigger className="w-full h-18 bg-zinc-100 border-zinc-200 rounded-xl">
              <div className="flex items-center gap-2">
                {(() => {
                  const IconComponent = iconOptions.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.icon)?.icon || Star
                  return <IconComponent className={`w-4 h-4 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />
                })()}
                <SelectValue placeholder="Seleccione un icono" />
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-[300px] bg-white">
              <div className="grid grid-cols-4 gap-2 p-2">
                {iconOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="flex items-center justify-center p-2 hover:bg-zinc-100 rounded-lg"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <IconComponent className={`w-6 h-6 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />
                        <span className="text-xs text-center">{option.name}</span>
                      </div>
                    </SelectItem>
                  )
                })}
              </div>
            </SelectContent>
          </Select>
        </div> */}

        {/* Color del fondo del icono */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Color del fondo del icono</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconBgColor || 'slate'}
              onValueChange={(value) => handleSettingsChange('iconBgColor', value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconBgColor || 'slate', store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconBgShade || 500) }}></div>
                  <SelectValue placeholder="Seleccione un color" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-[300px] bg-white">
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(color.value, store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconBgShade || 500) }}></div>
                      <span>{color.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconBgShade?.toString() || '500'}
              onValueChange={(value) => handleSettingsChange('iconBgShade', Number.parseInt(value))}
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

        {/* Color del icono */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Color del icono</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}
              onValueChange={(value) => handleSettingsChange('iconColor', value)}
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
              onValueChange={(value) => handleSettingsChange('iconColorShade', Number.parseInt(value))}
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

        {/* Color del título */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Color del título</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorCard || 'slate'}
              onValueChange={(value) => handleSettingsChange('titleColorCard', value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorCard || 'slate', store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorShadeCard || 500) }}></div>
                  <SelectValue placeholder="Seleccione un color" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-[300px] bg-white">
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(color.value, store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorShadeCard || 500) }}></div>
                      <span>{color.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleColorShadeCard?.toString() || '500'}
              onValueChange={(value) => handleSettingsChange('titleColorShadeCard', Number.parseInt(value))}
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

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Color del párrafo</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select
              value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorCard || 'slate'}
              onValueChange={(value) => handleSettingsChange('paragraphColorCard', value)}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorCard || 'slate', store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorShadeCard || 500) }}></div>
                  <SelectValue placeholder="Seleccione un color" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-[300px] bg-white">
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(color.value, store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorShadeCard || 500) }}></div>
                      <span>{color.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.paragraphColorShadeCard?.toString() || '500'}
              onValueChange={(value) => handleSettingsChange('paragraphColorShadeCard', Number.parseInt(value))}
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

        {/* Alineación del texto */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlignLeft className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Alineación del texto</span>
          </div>
          <RadioGroup
            defaultValue="text-left"
            value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign || 'text-left'}
            onValueChange={(value) => {
              const currentState = crearStore.get()
              const selectedCategory = currentState.infoStage4?.categorySelectToEdit
              if (selectedCategory) {
                const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                  if (cat.id === selectedCategory.id) {
                    return {
                      ...cat,
                      cardInicioSettings: {
                        ...cat.cardInicioSettings,
                        textAlign: value
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
                        textAlign: value
                      }
                    }
                  }
                })
              }
            }}
            className="flex space-x-2"
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="radio"
                  id="text-left"
                  name="text-align"
                  value="text-left"
                  checked={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === 'text-left'}
                  onChange={(e) => {
                    const currentState = crearStore.get()
                    const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                    if (selectedCategory) {
                      const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                        if (cat.id === selectedCategory.id) {
                          return {
                            ...cat,
                            cardInicioSettings: {
                              ...cat.cardInicioSettings,
                              textAlign: e.target.value
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
                              textAlign: e.target.value
                            }
                          }
                        }
                      })
                    }
                  }}
                  className="w-4 h-4 appearance-none border-2 border-zinc-300 rounded-full checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                />
                {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === 'text-left' && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <Label htmlFor="text-left" className="flex items-center cursor-pointer">
                <AlignLeft className="w-4 h-4 mr-1" /> Izquierda
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="radio"
                  id="text-center"
                  name="text-align"
                  value="text-center"
                  checked={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === 'text-center'}
                  onChange={(e) => {
                    const currentState = crearStore.get()
                    const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                    if (selectedCategory) {
                      const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                        if (cat.id === selectedCategory.id) {
                          return {
                            ...cat,
                            cardInicioSettings: {
                              ...cat.cardInicioSettings,
                              textAlign: e.target.value
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
                              textAlign: e.target.value
                            }
                          }
                        }
                      })
                    }
                  }}
                  className="w-4 h-4 appearance-none border-2 border-zinc-300 rounded-full checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                />
                {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === 'text-center' && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <Label htmlFor="text-center" className="flex items-center cursor-pointer">
                <AlignCenter className="w-4 h-4 mr-1" /> Centro
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="radio"
                  id="text-right"
                  name="text-align"
                  value="text-right"
                  checked={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === 'text-right'}
                  onChange={(e) => {
                    const currentState = crearStore.get()
                    const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                    if (selectedCategory) {
                      const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                        if (cat.id === selectedCategory.id) {
                          return {
                            ...cat,
                            cardInicioSettings: {
                              ...cat.cardInicioSettings,
                              textAlign: e.target.value
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
                              textAlign: e.target.value
                            }
                          }
                        }
                      })
                    }
                  }}
                  className="w-4 h-4 appearance-none border-2 border-zinc-300 rounded-full checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                />
                {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === 'text-right' && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <Label htmlFor="text-right" className="flex items-center cursor-pointer">
                <AlignRight className="w-4 h-4 mr-1" /> Derecha
              </Label>
            </div>
          </RadioGroup>
        </div>

        </div>

        {/* Border radius */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CircleDashed className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Redondeo de esquinas</span>
          </div>
          
            <Select
              value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.rounded || 'rounded-lg'}
              onValueChange={(value) => {
                const currentState = crearStore.get()
                const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                if (selectedCategory) {
                  const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                    if (cat.id === selectedCategory.id) {
                      return {
                        ...cat,
                        cardInicioSettings: {
                          ...cat.cardInicioSettings,
                          classCardCustomization: {
                            ...cat.cardInicioSettings.classCardCustomization,
                            rounded: value
                          }
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
                          classCardCustomization: {
                            ...selectedCategory.cardInicioSettings.classCardCustomization,
                            rounded: value
                          }
                        }
                      }
                    }
                  })
                }
              }}
            >
              <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                <SelectValue placeholder="Redondeo" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="rounded-none">Sin redondeo</SelectItem>
                <SelectItem value="rounded-sm">Pequeño</SelectItem>
                <SelectItem value="rounded">Mediano</SelectItem>
                <SelectItem value="rounded-lg">Grande</SelectItem>
                <SelectItem value="rounded-xl">Extra grande</SelectItem>
                <SelectItem value="rounded-2xl">2XL</SelectItem>
                <SelectItem value="rounded-3xl">3XL</SelectItem>
                <SelectItem value="rounded-full">Completo</SelectItem>
              </SelectContent>
            </Select>
        </div>

        {/* Sombra */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Sombra</span>
          </div>
          <Select
            value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.shadow || 'shadow-md'}
            onValueChange={(value) => {
              const currentState = crearStore.get()
              const selectedCategory = currentState.infoStage4?.categorySelectToEdit
              if (selectedCategory) {
                const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                  if (cat.id === selectedCategory.id) {
                    return {
                      ...cat,
                      cardInicioSettings: {
                        ...cat.cardInicioSettings,
                        classCardCustomization: {
                          ...cat.cardInicioSettings.classCardCustomization,
                          shadow: value
                        }
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
                        classCardCustomization: {
                          ...selectedCategory.cardInicioSettings.classCardCustomization,
                          shadow: value
                        }
                      }
                    }
                  }
                })
              }
            }}
          >
            <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
              <SelectValue placeholder="Sombra" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="shadow-none">Sin sombra</SelectItem>
              <SelectItem value="shadow-sm">Sombra pequeña</SelectItem>
              <SelectItem value="shadow">Sombra normal</SelectItem>
              <SelectItem value="shadow-md">Sombra mediana</SelectItem>
              <SelectItem value="shadow-lg">Sombra grande</SelectItem>
              <SelectItem value="shadow-xl">Sombra extra grande</SelectItem>
              <SelectItem value="shadow-2xl">Sombra 2XL</SelectItem>
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
              checked={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.hasBorder || false}
              onCheckedChange={(checked) => {
                const currentState = crearStore.get()
                const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                if (selectedCategory) {
                  const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                    if (cat.id === selectedCategory.id) {
                      return {
                        ...cat,
                        cardInicioSettings: {
                          ...cat.cardInicioSettings,
                          classCardCustomization: {
                            ...cat.cardInicioSettings.classCardCustomization,
                            hasBorder: checked
                          }
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
                          classCardCustomization: {
                            ...selectedCategory.cardInicioSettings.classCardCustomization,
                            hasBorder: checked
                          }
                        }
                      }
                    }
                  })
                }
              }}
            />
          </div>

          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.hasBorder && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Select
                value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderWidth || 'border'}
                onValueChange={(value) => {
                  const currentState = crearStore.get()
                  const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                  if (selectedCategory) {
                    const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                      if (cat.id === selectedCategory.id) {
                        return {
                          ...cat,
                          cardInicioSettings: {
                            ...cat.cardInicioSettings,
                            classCardCustomization: {
                              ...cat.cardInicioSettings.classCardCustomization,
                              borderWidth: value
                            }
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
                            classCardCustomization: {
                              ...selectedCategory.cardInicioSettings.classCardCustomization,
                              borderWidth: value
                            }
                          }
                        }
                      }
                    })
                  }
                }}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <SelectValue placeholder="Grosor" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="border">1px</SelectItem>
                  <SelectItem value="border-2">2px</SelectItem>
                  <SelectItem value="border-4">4px</SelectItem>
                  <SelectItem value="border-8">8px</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderColor || 'slate'}
                onValueChange={(value) => {
                  const currentState = crearStore.get()
                  const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                  if (selectedCategory) {
                    const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                      if (cat.id === selectedCategory.id) {
                        return {
                          ...cat,
                          cardInicioSettings: {
                            ...cat.cardInicioSettings,
                            classCardCustomization: {
                              ...cat.cardInicioSettings.classCardCustomization,
                              borderColor: value
                            }
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
                            classCardCustomization: {
                              ...selectedCategory.cardInicioSettings.classCardCustomization,
                              borderColor: value
                            }
                          }
                        }
                      }
                    })
                  }
                }}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full bg-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderShade || '500'}`}
                    ></div>
                    <SelectValue placeholder="Color" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[300px] bg-white">
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full bg-${color.value}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderShade || '500'}`}></div>
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.classCardCustomization?.borderShade?.toString() || '500'}
                onValueChange={(value) => {
                  const currentState = crearStore.get()
                  const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                  if (selectedCategory) {
                    const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                      if (cat.id === selectedCategory.id) {
                        return {
                          ...cat,
                          cardInicioSettings: {
                            ...cat.cardInicioSettings,
                            classCardCustomization: {
                              ...cat.cardInicioSettings.classCardCustomization,
                              borderShade: value
                            }
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
                            classCardCustomization: {
                              ...selectedCategory.cardInicioSettings.classCardCustomization,
                              borderShade: value
                            }
                          }
                        }
                      }
                    })
                  }
                }}
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
          onClick={() => setCurrentStep("cards-inicio-web")}
          className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
            <ArrowBigRightDash className="w-4 h-4" />
            Siguiente personalización
        </button>
      </div> 
    </form>
    </>)

}
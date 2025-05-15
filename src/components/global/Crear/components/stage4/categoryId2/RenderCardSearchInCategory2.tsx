import React, { useState, useEffect } from 'react'
import { ArrowBigLeftDash, ArrowBigRightDash, Calendar, Clock, MapPin, Star, CircleDashed, Layers, Square, Palette, Type } from "lucide-react"
import { Badge } from "../../../../../ui/badge"
import { Button } from "../../../../../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../../../../../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Switch } from "../../ui/switch"
import { RenderInitialQuestionComponentProps } from "../../../interfaces/modelsStage4"
import { useStore } from '@nanostores/react'
import { crearStore } from 'src/stores/crearStore'

interface ServiceCardProps {
  id: string
  name: string
  category: string
  description: string
  rating: number
  location: string
  imageUrl: string
  initAvailable1: string
  initAvailable2: string
  initAvailable3: string
  initAvailable4: string
  isPopular?: boolean
}

function ServiceCard({
  id = "1",
  name = "Barbería Moderna",
  category = "Peluquería",
  description = "Cortes de cabello, barba y tratamientos capilares con los mejores profesionales.",
  rating = 4.8,
  location = "Av. Principal 123, Ciudad",
  imageUrl = "/placeholder.svg?height=200&width=400",
  initAvailable1 = "10:00 AM",
  initAvailable2 = "02:00 PM",
  initAvailable3 = "04:00 PM",
  initAvailable4 = "09:00 PM",
  isPopular = true,
}: ServiceCardProps) {
  const store = useStore(crearStore)
  
  // Obtener la sombra seleccionada
  const selectedShadow = store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.shadow || 'shadow-md';
  
  // Construir la clase de la card basada en las propiedades de personalización
  const cardClass = [
    "overflow-hidden",
    "transition-all", 
    "w-full", 
    "max-w-sm",
    store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.rounded || 'rounded-xl',
    selectedShadow !== 'shadow-none' ? selectedShadow : '!shadow-none', // Aplicar la sombra seleccionada o eliminar la sombra si se seleccionó 'shadow-none'
  ].join(' ');
  
  // Añadir borde si está habilitado
  const borderClass = store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.hasBorder 
    ? `${store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.borderWidth || 'border'} border-${store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.borderColor || 'slate'}-${store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.borderShade || '500'}` 
    : "";
  
  // Combinar clases
  const finalCardClass = `${cardClass} ${borderClass}`.trim()
  
  return (
    <Card className={finalCardClass}>
      <div className="relative">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="h-48 w-full object-cover"
        />
        {isPopular && <Badge className={`absolute right-2 top-2 bg-${store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.bgColorTagPopular || 'yellow'}-${store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.bgShadeTagPopular || '500'} text-${store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.textColorTagPopular || 'white'}-${store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.textShadeTagPopular || '500'}`}>Popular</Badge>}
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {category}
            </Badge>
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{location}</span>
          </div>

          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-green-600 font-medium">Disponibilidad de: {initAvailable1} a: {initAvailable2} y de: {initAvailable3} a: {initAvailable4}</span>
          </div>
        </div>
      </CardContent>    

      <CardFooter className="bg-muted/20 pt-2">
        <div className="flex w-full gap-2">
          <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white flex gap-2 px-4 py-2 rounded-lg">
          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
          Agendar cita</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export const RenderCardSearchInCategory2 = ({ setCurrentStep, handlePrev }: 
    RenderInitialQuestionComponentProps) => {
      const store = useStore(crearStore)
      const [isValid, setIsValid] = useState(false)
    
      // Mapa de colores para visualización
      const colorMap = {
          red: '#ef4444',
          orange: '#f97316',
          amber: '#f59e0b',
          yellow: '#eab308',
          lime: '#84cc16',
          green: '#22c55e',
          emerald: '#10b981',
          teal: '#14b8a6',
          cyan: '#06b6d4',
          sky: '#0ea5e9',
          blue: '#3b82f6',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          purple: '#a855f7',
          fuchsia: '#d946ef',
          pink: '#ec4899',
          rose: '#f43f5e',
          slate: '#64748b',
          zinc: '#71717a',
          gray: '#737373',
          neutral: '#737373',
          stone: '#78716c',
          black: '#000000',
          white: '#ffffff'
      }
      
      // Función para obtener el color para mostrar en el círculo
      const getIconColor = (color: string, shade: string) => {
          return colorMap[color as keyof typeof colorMap] || color
      }
      
      // Componente para mostrar un elemento de selección con un círculo de color
      const ColorSelectItem = ({ color, label }: { color: string, label: string }) => {
          return (
              <SelectItem value={color} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(color, '500') }}></div>
                      <span>{label}</span>
                  </div>
              </SelectItem>
          )
      }
      
      // Componente para mostrar un color trigger
      const ColorTrigger = ({ color, shade, placeholder }: { color: string, shade: string, placeholder: string }) => {
          return (
              <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getIconColor(color, shade) }}></div>
                  <SelectValue placeholder={placeholder} />
              </div>
          )
      }
  
      const services = [
          {
            id: "1",
            name: "Barbería Moderna",
            category: "Peluquería",
            description: "Cortes de cabello, barba y tratamientos capilares con los mejores profesionales.",
            rating: 4.8,
            location: "Av. Principal 123, Ciudad",
            imageUrl: "https://flowbite.com/docs/images/examples/image-3@2x.jpg",
            initAvailable1: "10:00 AM",
            initAvailable2: "02:00 PM",
            initAvailable3: "04:00 PM",
            initAvailable4: "09:00 PM",
            isPopular: true,
          }
      ]

      // Función para manejar los cambios en la personalización de la card
      const handleCardCustomizationChange = (
        key: keyof NonNullable<typeof store.infoStage4.businessCategories>[0]['cardSearchInCategory2'],
        value: string | boolean,
      ) => {
        const currentState = crearStore.get()
        
        if (currentState.infoStage4?.businessCategories?.[1]) {
          // Inicializar cardSearchInCategory2 si no existe
          const currentCardSearchInCategory2 = currentState.infoStage4.businessCategories[1].cardSearchInCategory2 || {
            // Propiedades básicas de la card
            rounded: 'rounded-xl',
            shadow: 'shadow-md',
            hasBorder: false,
            borderWidth: 'border',
            borderColor: 'slate',
            borderShade: '500',

            // Etiqueta "Popular"
            bgColorTagPopular: 'green',
            bgShadeTagPopular: '500',
            textColorTagPopular: 'white',
            textShadeTagPopular: '500',
          }
  
          const updatedCardSearchInCategory2 = {
            ...currentCardSearchInCategory2,
            [key]: value
          }
  
          const updatedCategories = [...(currentState.infoStage4?.businessCategories || [])]
          if (updatedCategories[1]) {
            updatedCategories[1] = {
              ...updatedCategories[1],
              cardSearchInCategory2: updatedCardSearchInCategory2
            }
          }
  
          const updatedState = {
            ...currentState,
            infoStage4: {
              ...currentState.infoStage4,
              businessCategories: updatedCategories
            }
          }
  
          crearStore.set(updatedState)
          localStorage.setItem('crearStore', JSON.stringify(updatedState))
        }
      }
  
      // Inicializar cardSearchInCategory2 si no existe
      useEffect(() => {
        const currentState = crearStore.get()
        
        if (currentState.infoStage4?.businessCategories?.[1] && !currentState.infoStage4.businessCategories[1].cardSearchInCategory2) {
          const defaultCardSearchInCategory2 = {
            // Propiedades básicas de la card
            rounded: 'rounded-xl',
            shadow: 'shadow-md',
            hasBorder: false,
            borderWidth: 'border',
            borderColor: 'slate',
            borderShade: '500',

            // Etiqueta "Nuevo"
            bgColorTagPopular: 'green',
            bgShadeTagPopular: '500',
            textColorTagPopular: 'white',
            textShadeTagPopular: '500',
          };
          
          const updatedCategories = [...(currentState.infoStage4?.businessCategories || [])]
          if (updatedCategories[1]) {
            updatedCategories[1] = {
              ...updatedCategories[1],
              cardSearchInCategory2: defaultCardSearchInCategory2
            }
          }
          
          const updatedState = {
            ...currentState,
            infoStage4: {
              ...currentState.infoStage4,
              businessCategories: updatedCategories
            }
          }
  
          crearStore.set(updatedState)
          localStorage.setItem('crearStore', JSON.stringify(updatedState))
        }
      }, [store.infoStage4?.categorySelectToEdit])

    return (
        <div className="flex flex-col gap-6 justify-center items-center p-4">
            <div className="space-y-4 w-full flex flex-col items-center gap-4">
                {/* Visualización de la tarjeta */}
                <div className="flex flex-col gap-6 w-full max-w-lg items-center">
                    {services.map((service) => (
                        <ServiceCard key={service.id} {...service} />
                    ))}
                </div>

                {/* Opciones de personalización */}
                <div className="space-y-6 w-full max-w-lg bg-zinc-50 p-4 rounded-xl">
                    <h3 className="text-sm font-medium text-zinc-900">Personalización de la tarjeta</h3>

                    {/* Redondeo de esquinas */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <CircleDashed className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm text-zinc-500">Redondeo de esquinas</span>
                        </div>
                        <Select
                            value={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.rounded || 'rounded-xl'}
                            onValueChange={(value) => handleCardCustomizationChange('rounded', value)}
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
                            value={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.shadow || 'shadow-md'}
                            onValueChange={(value) => handleCardCustomizationChange('shadow', value)}
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
                                checked={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.hasBorder || false}
                                onCheckedChange={(checked) => handleCardCustomizationChange('hasBorder', checked)}
                            />
                        </div>

                        {store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.hasBorder && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <Select
                                    value={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.borderWidth || 'border'}
                                    onValueChange={(value) => handleCardCustomizationChange('borderWidth', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <SelectValue placeholder="Ancho de borde" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="border">Normal</SelectItem>
                                        <SelectItem value="border-2">Grueso</SelectItem>
                                        <SelectItem value="border-4">Extra grueso</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.borderColor || 'slate'}
                                    onValueChange={(value) => handleCardCustomizationChange('borderColor', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.borderColor || 'slate'}
                                            shade={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.borderShade || '500'}
                                            placeholder="Color de borde"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <ColorSelectItem color="red" label="Rojo" />
                                        <ColorSelectItem color="orange" label="Naranja" />
                                        <ColorSelectItem color="amber" label="Ámbar" />
                                        <ColorSelectItem color="yellow" label="Amarillo" />
                                        <ColorSelectItem color="lime" label="Lima" />
                                        <ColorSelectItem color="green" label="Verde" />
                                        <ColorSelectItem color="emerald" label="Esmeralda" />
                                        <ColorSelectItem color="teal" label="Verde azulado" />
                                        <ColorSelectItem color="cyan" label="Cian" />
                                        <ColorSelectItem color="sky" label="Celeste" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Púrpura" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosado" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="neutral" label="Neutro" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.borderShade || '500'}
                                    onValueChange={(value) => handleCardCustomizationChange('borderShade', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <SelectValue placeholder="Intensidad" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {['100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => (
                                            <SelectItem key={shade} value={shade}>{shade}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {/* Personalización de etiqueta "Nuevo" */}
                    <div className="space-y-2 border-t pt-4 mt-4">
                        <h3 className="text-sm font-medium text-zinc-900">Etiqueta "Popular"</h3>
                        
                        {/* Color de fondo */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Color de fondo</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    value={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.bgColorTagPopular || 'green'}
                                    onValueChange={(value) => handleCardCustomizationChange('bgColorTagPopular', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.bgColorTagPopular || 'green'}
                                            shade={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.bgShadeTagPopular || '500'}
                                            placeholder="Color"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                            <ColorSelectItem color="red" label="Rojo" />
                                            <ColorSelectItem color="orange" label="Naranja" />
                                            <ColorSelectItem color="amber" label="Ámbar" />
                                            <ColorSelectItem color="yellow" label="Amarillo" />
                                            <ColorSelectItem color="lime" label="Lima" />
                                            <ColorSelectItem color="green" label="Verde" />
                                            <ColorSelectItem color="emerald" label="Esmeralda" />
                                            <ColorSelectItem color="teal" label="Verde azulado" />
                                            <ColorSelectItem color="cyan" label="Cian" />
                                            <ColorSelectItem color="sky" label="Celeste" />
                                            <ColorSelectItem color="blue" label="Azul" />
                                            <ColorSelectItem color="indigo" label="Índigo" />
                                            <ColorSelectItem color="violet" label="Violeta" />
                                            <ColorSelectItem color="purple" label="Púrpura" />
                                            <ColorSelectItem color="fuchsia" label="Fucsia" />
                                            <ColorSelectItem color="pink" label="Rosa" />
                                            <ColorSelectItem color="rose" label="Rosado" />
                                            <ColorSelectItem color="slate" label="Pizarra" />
                                            <ColorSelectItem color="gray" label="Gris" />
                                            <ColorSelectItem color="zinc" label="Zinc" />
                                            <ColorSelectItem color="neutral" label="Neutro" />
                                            <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.bgShadeTagPopular || '500'}
                                    onValueChange={(value) => handleCardCustomizationChange('bgShadeTagPopular', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <SelectValue placeholder="Intensidad" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {['100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => (
                                            <SelectItem key={shade} value={shade}>{shade}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Color del texto */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Color del texto</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    value={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.textColorTagPopular || 'white'}
                                    onValueChange={(value) => handleCardCustomizationChange('textColorTagPopular', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.textColorTagPopular || 'white'}
                                            shade={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.textShadeTagPopular || '500'}
                                            placeholder="Color"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                            <ColorSelectItem color="red" label="Rojo" />
                                            <ColorSelectItem color="orange" label="Naranja" />
                                            <ColorSelectItem color="amber" label="Ámbar" />
                                            <ColorSelectItem color="yellow" label="Amarillo" />
                                            <ColorSelectItem color="lime" label="Lima" />
                                            <ColorSelectItem color="green" label="Verde" />
                                            <ColorSelectItem color="emerald" label="Esmeralda" />
                                            <ColorSelectItem color="teal" label="Verde azulado" />
                                            <ColorSelectItem color="cyan" label="Cian" />
                                            <ColorSelectItem color="sky" label="Celeste" />
                                            <ColorSelectItem color="blue" label="Azul" />
                                            <ColorSelectItem color="indigo" label="Índigo" />
                                            <ColorSelectItem color="violet" label="Violeta" />
                                            <ColorSelectItem color="purple" label="Púrpura" />
                                            <ColorSelectItem color="fuchsia" label="Fucsia" />
                                            <ColorSelectItem color="pink" label="Rosa" />
                                            <ColorSelectItem color="rose" label="Rosado" />
                                            <ColorSelectItem color="slate" label="Pizarra" />
                                            <ColorSelectItem color="gray" label="Gris" />
                                            <ColorSelectItem color="zinc" label="Zinc" />
                                            <ColorSelectItem color="neutral" label="Neutro" />
                                            <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.businessCategories?.[1]?.cardSearchInCategory2?.textShadeTagPopular || '500'}
                                    onValueChange={(value) => handleCardCustomizationChange('textShadeTagPopular', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <SelectValue placeholder="Intensidad" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {['100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => (
                                            <SelectItem key={shade} value={shade}>{shade}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 mt-4">
                <button
                    type="button"
                    onClick={() => setCurrentStep("cards-inicio-web")}
                    className="w-[30%] h-10 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-colors"
                >
                    <ArrowBigLeftDash className="w-4 h-4" />
                    Atrás
                </button>
                <button
                    type="button"
                    onClick={() => setCurrentStep("cards-search-in-category")}
                    className="w-[70%] h-10 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-colors"
                >
                    <ArrowBigRightDash className="w-4 h-4" />
                    Siguiente personalización
                </button>
            </div>
        </div>
    )
}
import React, { useState, useEffect } from 'react'
import { ArrowBigLeftDash, ArrowBigRightDash, Eye, Heart, Star, CircleDashed, Layers, Square, Palette, Type } from "lucide-react"
import { Badge } from "../../../../../ui/badge"
import { Button } from "../../../../../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../../../../../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Switch } from "../../ui/switch"
import { RenderInitialQuestionComponentProps } from "../../../interfaces/modelsStage4"
import { useStore } from '@nanostores/react'
import { crearStore } from 'src/stores/crearStore'

interface ProductCardProps {
  id: string
  name: string
  category: string
  description: string
  rating: number
  imageUrl: string
  price: number
  originalPrice?: number
  isNew?: boolean
  isFavorite?: boolean
}

function ProductCard({
  id = "1",
  name = "Camiseta Premium Algodón",
  category = "Ropa",
  description = "Camiseta de alta calidad fabricada con algodón premium.",
  rating = 4.5,
  imageUrl = "/placeholder.svg?height=400&width=300",
  price = 120000,
  originalPrice = 150000,
  isNew = true,
  isFavorite = false,
}: ProductCardProps) {
  const [favorite, setFavorite] = useState(isFavorite)
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
  const store = useStore(crearStore)

  const formatPrice = (price: number) => {
    return price.toLocaleString("es-CO", {
      maximumFractionDigits: 0,
    })
  }

  // Construir la clase de la card basada en las propiedades de personalización
  const cardClass = [
    "overflow-hidden",
    "transition-all", 
    "hover:shadow-lg", 
    "w-full", 
    "max-w-sm",
    store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.rounded || 'rounded-xl',
    store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.shadow || 'shadow-md'
  ].join(' ');
  
  // Añadir borde si está habilitado
  const borderClass = store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.hasBorder 
    ? `${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.borderWidth || 'border'} border-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.borderColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.borderShade || '500'}` 
    : "";
  
  // Combinar clases
  const finalCardClass = `${cardClass} ${borderClass}`.trim()

  return (
    <Card className={finalCardClass}>
      <div className="relative w-full aspect-square">
        {/* Badge Nuevo */}
        {isNew && (
          <Badge className={`absolute left-3 top-3 bg-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorTagNew || 'green'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeTagNew || '500'} text-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorTagNew || 'white'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeTagNew || '500'} px-4 py-1 rounded-full text-xs font-semibold z-10`}>Nuevo</Badge>
        )}
        {/* Corazón */}
        <button
          type="button"
          onClick={() => setFavorite(!favorite)}
          className={`absolute right-3 top-3 z-10 bg-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorButtonFavorite || 'white'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeButtonFavorite || '500'} rounded-full p-2 shadow-sm flex items-center justify-center`}
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          <Heart className={`h-5 w-5 ${favorite ? `fill-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorButtonFavorite || 'red'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeButtonFavorite || '500'} text-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorButtonFavorite || 'red'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeButtonFavorite || '500'}` : "text-zinc-400"}`} />
        </button>
        {/* Imagen */}
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover"
          style={{ background: '#ededed' }}
        />
        {/* Badge Descuento */}
        {discount > 0 && (
          <Badge className={`absolute left-3 bottom-3 bg-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorTagDcto || 'red'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeTagDcto || '500'} text-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorTagDcto || 'white'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeTagDcto || '500'} px-4 py-1 rounded-full text-xs font-semibold z-10`}>-{discount}%</Badge>
        )}
      </div>
      <CardContent className="pb-2 pt-4 px-5">
        <div className={`mb-1 text-sm text-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorCategory || 'zinc'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeCategory || '500'} ${store.infoStage2?.paragraphFont || store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.fontCategory || 'font-normal'}`}>{category}</div>
        <h3 className={`mb-2 leading-tight text-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorProductName || 'zinc'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeProductName || '900'} ${store.infoStage2?.titleFont || store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.fontProductName || 'font-semibold text-lg'}`}>{name}</h3>
        <div className="flex items-center gap-1 mb-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-5 pt-4 gap-2 bg-white">
        <div className="flex flex-col w-full">
          {originalPrice && originalPrice > price && (
            <span className={`text-sm line-through truncate text-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorOriginalPrice || 'zinc'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeOriginalPrice || '400'}`}>$ {formatPrice(originalPrice)}</span>
          )}
          <span className={`text-2xl font-bold truncate text-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorPrice || 'zinc'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadePrice || '900'}`}>$ {formatPrice(price)}</span>
        </div>
        <Button className={`bg-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorButtonDetail || 'zinc'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeButtonDetail || '900'} hover:bg-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorButtonDetail || 'zinc'}-${Number(store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeButtonDetail || '900') - 100} text-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorButtonDetail || 'white'}-${store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeButtonDetail || '500'} flex gap-2 px-4 py-2 rounded-lg`}>
          <Eye className="h-5 w-5" />
          <span>Detalle</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

export const RenderCardSearchInCategory1 = ({ setCurrentStep }: RenderInitialQuestionComponentProps) => {
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

    const products = [
        {
          id: "2",
          name: "Smartphone Galaxy Ultra",
          category: "Electrónica",
          description: "El último smartphone con tecnología de punta.",
          rating: 4.8,
          imageUrl: "https://flowbite.com/docs/images/examples/image-3@2x.jpg",
          price: 3500000,
          originalPrice: 4200000,
          isNew: true,
          isFavorite: true,
        }
    ]

    // Función para manejar los cambios en la personalización de la card
    const handleCardCustomizationChange = (
      key: keyof NonNullable<typeof store.infoStage4.categorySelectToEdit>['cardSearchInCategory1'],
      value: string | boolean,
    ) => {
      const currentState = crearStore.get()
      const selectedCategory = currentState.infoStage4?.categorySelectToEdit

      if (selectedCategory) {
        // Inicializar cardSearchInCategory1 si no existe
        const currentCardSearchInCategory1 = selectedCategory.cardSearchInCategory1 || {
          // Propiedades básicas de la card
          rounded: 'rounded-xl',
          shadow: 'shadow-md',
          hasBorder: false,
          borderWidth: 'border',
          borderColor: 'slate',
          borderShade: '500',
          
          // Etiqueta "Nuevo"
          bgColorTagNew: 'green',
          bgShadeTagNew: '500',
          textColorTagNew: 'white',
          textShadeTagNew: '500',
          
          // Botón de favoritos (corazón)
          bgColorButtonFavorite: 'white',
          bgShadeButtonFavorite: '500',
          textColorButtonFavorite: 'red',
          textShadeButtonFavorite: '500',
          
          // Etiqueta de descuento "-17%"
          bgColorTagDcto: 'red',
          bgShadeTagDcto: '500',
          textColorTagDcto: 'white',
          textShadeTagDcto: '500',
          
          // Botón "Detalle"
          bgColorButtonDetail: 'zinc',
          bgShadeButtonDetail: '900',
          textColorButtonDetail: 'white',
          textShadeButtonDetail: '500',

          // Texto de categoría
          textColorCategory: 'zinc',
          textShadeCategory: '500',
          fontCategory: 'font-normal',

          // Texto de nombre del producto
          textColorProductName: 'zinc',
          textShadeProductName: '900',
          fontProductName: 'font-semibold text-lg',

          // Texto de precios
          textColorPrice: 'zinc',
          textShadePrice: '900',
          textColorOriginalPrice: 'zinc',
          textShadeOriginalPrice: '400'
        }

        const updatedCardSearchInCategory1 = {
          ...currentCardSearchInCategory1,
          [key]: value
        }

        const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
          if (cat.id === selectedCategory.id) {
            return {
              ...cat,
              cardSearchInCategory1: updatedCardSearchInCategory1
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
              cardSearchInCategory1: updatedCardSearchInCategory1
            }
          }
        }

        crearStore.set(updatedState)
        localStorage.setItem('crearStore', JSON.stringify(updatedState))
      }
    }

    // Inicializar cardSearchInCategory1 si no existe
    useEffect(() => {
      const currentState = crearStore.get()
      const selectedCategory = currentState.infoStage4?.categorySelectToEdit
      
      if (selectedCategory && !selectedCategory.cardSearchInCategory1) {
        const defaultCardSearchInCategory1 = {
          // Propiedades básicas de la card
          rounded: 'rounded-xl',
          shadow: 'shadow-md',
          hasBorder: false,
          borderWidth: 'border',
          borderColor: 'slate',
          borderShade: '500',
          
          // Etiqueta "Nuevo"
          bgColorTagNew: 'green',
          bgShadeTagNew: '500',
          textColorTagNew: 'white',
          textShadeTagNew: '500',
          
          // Botón de favoritos (corazón)
          bgColorButtonFavorite: 'white',
          bgShadeButtonFavorite: '500',
          textColorButtonFavorite: 'red',
          textShadeButtonFavorite: '500',
          
          // Etiqueta de descuento "-17%"
          bgColorTagDcto: 'red',
          bgShadeTagDcto: '500',
          textColorTagDcto: 'white',
          textShadeTagDcto: '500',
          
          // Botón "Detalle"
          bgColorButtonDetail: 'zinc',
          bgShadeButtonDetail: '900',
          textColorButtonDetail: 'white',
          textShadeButtonDetail: '500',

          // Texto de categoría
          textColorCategory: 'zinc',
          textShadeCategory: '500',
          fontCategory: 'font-normal',

          // Texto de nombre del producto
          textColorProductName: 'zinc',
          textShadeProductName: '900',
          fontProductName: 'font-semibold text-lg',

          // Texto de precios
          textColorPrice: 'zinc',
          textShadePrice: '900',
          textColorOriginalPrice: 'zinc',
          textShadeOriginalPrice: '400'
        };
        
        const updatedState = {
          ...currentState,
          infoStage4: {
            ...currentState.infoStage4,
            businessCategories: currentState.infoStage4?.businessCategories?.map(cat => 
              cat.id === selectedCategory.id 
                ? {
                    ...cat,
                    cardSearchInCategory1: defaultCardSearchInCategory1
                  }
                : cat
            ),
            categorySelectToEdit: {
              ...selectedCategory,
              cardSearchInCategory1: defaultCardSearchInCategory1
            }
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
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
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
                            value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.rounded || 'rounded-xl'}
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
                            value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.shadow || 'shadow-md'}
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
                                checked={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.hasBorder || false}
                                onCheckedChange={(checked) => handleCardCustomizationChange('hasBorder', checked)}
                            />
                        </div>

                        {store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.hasBorder && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.borderWidth || 'border'}
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
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.borderColor || 'slate'}
                                    onValueChange={(value) => handleCardCustomizationChange('borderColor', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.borderColor || 'slate'}
                                            shade={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.borderShade || '500'}
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
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.borderShade || '500'}
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
                        <h3 className="text-sm font-medium text-zinc-900">Etiqueta "Nuevo"</h3>
                        
                        {/* Color de fondo */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Color de fondo</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorTagNew || 'green'}
                                    onValueChange={(value) => handleCardCustomizationChange('bgColorTagNew', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorTagNew || 'green'}
                                            shade={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeTagNew || '500'}
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
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeTagNew || '500'}
                                    onValueChange={(value) => handleCardCustomizationChange('bgShadeTagNew', value)}
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
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorTagNew || 'white'}
                                    onValueChange={(value) => handleCardCustomizationChange('textColorTagNew', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorTagNew || 'green'}
                                            shade={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeTagNew || '500'}
                                            placeholder="Color"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <SelectItem value="white">Blanco</SelectItem>
                                        <SelectItem value="black">Negro</SelectItem>
                                        <SelectItem value="red">Rojo</SelectItem>
                                        <SelectItem value="orange">Naranja</SelectItem>
                                        <SelectItem value="amber">Ámbar</SelectItem>
                                        <SelectItem value="yellow">Amarillo</SelectItem>
                                        <SelectItem value="lime">Lima</SelectItem>
                                        <SelectItem value="green">Verde</SelectItem>
                                        <SelectItem value="emerald">Esmeralda</SelectItem>
                                        <SelectItem value="teal">Verde azulado</SelectItem>
                                        <ColorSelectItem color="cyan" label="Cian" />
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeTagNew || '500'}
                                    onValueChange={(value) => handleCardCustomizationChange('textShadeTagNew', value)}
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

                    {/* Personalización del botón de favoritos */}
                    <div className="space-y-2 border-t pt-4 mt-4">
                        <h3 className="text-sm font-medium text-zinc-900">Botón de favoritos (corazón)</h3>
                        
                        {/* Color de fondo */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Color de fondo</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorButtonFavorite || 'white'}
                                    onValueChange={(value) => handleCardCustomizationChange('bgColorButtonFavorite', value)}
                                >
                                   <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorButtonFavorite || 'green'}
                                            shade={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeButtonFavorite || '500'}
                                            placeholder="Color"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <SelectItem value="white">Blanco</SelectItem>
                                        <SelectItem value="red">Rojo</SelectItem>
                                        <SelectItem value="orange">Naranja</SelectItem>
                                        <SelectItem value="amber">Ámbar</SelectItem>
                                        <SelectItem value="yellow">Amarillo</SelectItem>
                                        <SelectItem value="lime">Lima</SelectItem>
                                        <SelectItem value="green">Verde</SelectItem>
                                        <SelectItem value="emerald">Esmeralda</SelectItem>
                                        <SelectItem value="teal">Verde azulado</SelectItem>
                                        <ColorSelectItem color="cyan" label="Cian" />
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeButtonFavorite || '500'}
                                    onValueChange={(value) => handleCardCustomizationChange('bgShadeButtonFavorite', value)}
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

                        {/* Color del icono */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Color del corazón (activo)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorButtonFavorite || 'red'}
                                    onValueChange={(value) => handleCardCustomizationChange('textColorButtonFavorite', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorButtonFavorite || 'green'}
                                            shade={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeButtonFavorite || '500'}
                                            placeholder="Color"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <SelectItem value="red">Rojo</SelectItem>
                                        <SelectItem value="orange">Naranja</SelectItem>
                                        <SelectItem value="amber">Ámbar</SelectItem>
                                        <SelectItem value="yellow">Amarillo</SelectItem>
                                        <SelectItem value="lime">Lima</SelectItem>
                                        <SelectItem value="green">Verde</SelectItem>
                                        <SelectItem value="emerald">Esmeralda</SelectItem>
                                        <SelectItem value="teal">Verde azulado</SelectItem>
                                        <SelectItem value="cyan">Cian</SelectItem>
                                        <SelectItem value="sky">Cielo</SelectItem>
                                        <SelectItem value="blue">Azul</SelectItem>
                                        <SelectItem value="indigo">Índigo</SelectItem>
                                        <SelectItem value="violet">Violeta</SelectItem>
                                        <SelectItem value="purple">Morado</SelectItem>
                                        <SelectItem value="fuchsia">Fucsia</SelectItem>
                                        <SelectItem value="pink">Rosa</SelectItem>
                                        <SelectItem value="rose">Rosa fuerte</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeButtonFavorite || '500'}
                                    onValueChange={(value) => handleCardCustomizationChange('textShadeButtonFavorite', value)}
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

                    {/* Personalización de etiqueta descuento */}
                    <div className="space-y-2 border-t pt-4 mt-4">
                        <h3 className="text-sm font-medium text-zinc-900">Etiqueta descuento</h3>
                        
                        {/* Color de fondo */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Color de fondo</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorTagDcto || 'red'}
                                    onValueChange={(value) => handleCardCustomizationChange('bgColorTagDcto', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorTagDcto || 'green'}
                                            shade={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeTagDcto || '500'}
                                            placeholder="Color"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <SelectItem value="red">Rojo</SelectItem>
                                        <SelectItem value="orange">Naranja</SelectItem>
                                        <SelectItem value="amber">Ámbar</SelectItem>
                                        <SelectItem value="yellow">Amarillo</SelectItem>
                                        <SelectItem value="lime">Lima</SelectItem>
                                        <SelectItem value="green">Verde</SelectItem>
                                        <SelectItem value="emerald">Esmeralda</SelectItem>
                                        <SelectItem value="teal">Verde azulado</SelectItem>
                                        <ColorSelectItem color="cyan" label="Cian" />
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeTagDcto || '500'}
                                    onValueChange={(value) => handleCardCustomizationChange('bgShadeTagDcto', value)}
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
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorTagDcto || 'white'}
                                    onValueChange={(value) => handleCardCustomizationChange('textColorTagDcto', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorTagDcto || 'green'}
                                            shade={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeTagDcto || '500'}
                                            placeholder="Color"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <SelectItem value="white">Blanco</SelectItem>
                                        <SelectItem value="black">Negro</SelectItem>
                                        <SelectItem value="red">Rojo</SelectItem>
                                        <SelectItem value="orange">Naranja</SelectItem>
                                        <SelectItem value="amber">Ámbar</SelectItem>
                                        <SelectItem value="yellow">Amarillo</SelectItem>
                                        <SelectItem value="lime">Lima</SelectItem>
                                        <SelectItem value="green">Verde</SelectItem>
                                        <SelectItem value="emerald">Esmeralda</SelectItem>
                                        <SelectItem value="teal">Verde azulado</SelectItem>
                                        <ColorSelectItem color="cyan" label="Cian" />
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeTagDcto || '500'}
                                    onValueChange={(value) => handleCardCustomizationChange('textShadeTagDcto', value)}
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

                    {/* Personalización del botón Detalle */}
                    <div className="space-y-2 border-t pt-4 mt-4">
                        <h3 className="text-sm font-medium text-zinc-900">Botón Detalle</h3>
                        
                        {/* Color de fondo */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Color de fondo</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorButtonDetail || 'zinc'}
                                    onValueChange={(value) => handleCardCustomizationChange('bgColorButtonDetail', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgColorButtonDetail || 'green'}
                                            shade={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeButtonDetail || '500'}
                                            placeholder="Color"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <SelectItem value="red">Rojo</SelectItem>
                                        <SelectItem value="orange">Naranja</SelectItem>
                                        <SelectItem value="amber">Ámbar</SelectItem>
                                        <SelectItem value="yellow">Amarillo</SelectItem>
                                        <SelectItem value="lime">Lima</SelectItem>
                                        <SelectItem value="green">Verde</SelectItem>
                                        <SelectItem value="emerald">Esmeralda</SelectItem>
                                        <SelectItem value="teal">Verde azulado</SelectItem>
                                        <ColorSelectItem color="cyan" label="Cian" />
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.bgShadeButtonDetail || '900'}
                                    onValueChange={(value) => handleCardCustomizationChange('bgShadeButtonDetail', value)}
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
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorButtonDetail || 'white'}
                                    onValueChange={(value) => handleCardCustomizationChange('textColorButtonDetail', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorButtonDetail || 'green'}
                                            shade={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeButtonDetail || '500'}
                                            placeholder="Color"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <SelectItem value="white">Blanco</SelectItem>
                                        <SelectItem value="black">Negro</SelectItem>
                                        <SelectItem value="red">Rojo</SelectItem>
                                        <SelectItem value="orange">Naranja</SelectItem>
                                        <SelectItem value="amber">Ámbar</SelectItem>
                                        <SelectItem value="yellow">Amarillo</SelectItem>
                                        <SelectItem value="lime">Lima</SelectItem>
                                        <SelectItem value="green">Verde</SelectItem>
                                        <SelectItem value="emerald">Esmeralda</SelectItem>
                                        <SelectItem value="teal">Verde azulado</SelectItem>
                                        <ColorSelectItem color="cyan" label="Cian" />
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeButtonDetail || '500'}
                                    onValueChange={(value) => handleCardCustomizationChange('textShadeButtonDetail', value)}
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

                    {/* Personalización de texto de categoría */}
                    <div className="space-y-2 border-t pt-4 mt-4">
                        <h3 className="text-sm font-medium text-zinc-900">Texto de categoría "Electrónica"</h3>
                        
                        {/* Color del texto */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Color del texto</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorCategory || 'zinc'}
                                    onValueChange={(value) => handleCardCustomizationChange('textColorCategory', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <ColorTrigger 
                                            color={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorCategory || 'green'}
                                            shade={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeCategory || '500'}
                                            placeholder="Color"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <SelectItem value="black">Negro</SelectItem>
                                        <SelectItem value="red">Rojo</SelectItem>
                                        <SelectItem value="orange">Naranja</SelectItem>
                                        <SelectItem value="amber">Ámbar</SelectItem>
                                        <SelectItem value="yellow">Amarillo</SelectItem>
                                        <SelectItem value="lime">Lima</SelectItem>
                                        <SelectItem value="green">Verde</SelectItem>
                                        <SelectItem value="emerald">Esmeralda</SelectItem>
                                        <SelectItem value="teal">Verde azulado</SelectItem>
                                        <ColorSelectItem color="cyan" label="Cian" />
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeCategory || '500'}
                                    onValueChange={(value) => handleCardCustomizationChange('textShadeCategory', value)}
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

                        {/* Estilo de fuente */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Type className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Estilo de fuente</span>
                            </div>
                            <Select
                                value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.fontCategory || 'font-normal'}
                                onValueChange={(value) => handleCardCustomizationChange('fontCategory', value)}
                            >
                                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                    <SelectValue placeholder="Estilo" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="font-normal">Normal</SelectItem>
                                    <SelectItem value="font-medium">Medio</SelectItem>
                                    <SelectItem value="font-semibold">Semibold</SelectItem>
                                    <SelectItem value="font-bold">Bold</SelectItem>
                                    <SelectItem value="font-light">Light</SelectItem>
                                    <SelectItem value="font-thin">Thin</SelectItem>
                                    <SelectItem value="italic">Cursiva</SelectItem>
                                    <SelectItem value="font-normal italic">Normal Cursiva</SelectItem>
                                    <SelectItem value="font-medium italic">Medio Cursiva</SelectItem>
                                    <SelectItem value="font-semibold italic">Semibold Cursiva</SelectItem>
                                    <SelectItem value="font-bold italic">Bold Cursiva</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Personalización de nombre del producto */}
                    <div className="space-y-2 border-t pt-4 mt-4">
                        <h3 className="text-sm font-medium text-zinc-900">Nombre del producto "Smartphone Galaxy Ultra"</h3>
                        
                        {/* Color del texto */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Color del texto</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorProductName || 'zinc'}
                                    onValueChange={(value) => handleCardCustomizationChange('textColorProductName', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <SelectValue placeholder="Color" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <SelectItem value="black">Negro</SelectItem>
                                        <SelectItem value="red">Rojo</SelectItem>
                                        <SelectItem value="orange">Naranja</SelectItem>
                                        <SelectItem value="amber">Ámbar</SelectItem>
                                        <SelectItem value="yellow">Amarillo</SelectItem>
                                        <SelectItem value="lime">Lima</SelectItem>
                                        <SelectItem value="green">Verde</SelectItem>
                                        <SelectItem value="emerald">Esmeralda</SelectItem>
                                        <SelectItem value="teal">Verde azulado</SelectItem>
                                        <ColorSelectItem color="cyan" label="Cian" />
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeProductName || '900'}
                                    onValueChange={(value) => handleCardCustomizationChange('textShadeProductName', value)}
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

                        {/* Estilo de fuente */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Type className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Estilo de fuente</span>
                            </div>
                            <Select
                                value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.fontProductName || 'font-semibold text-lg'}
                                onValueChange={(value) => handleCardCustomizationChange('fontProductName', value)}
                            >
                                <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                    <SelectValue placeholder="Estilo" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="font-normal text-base">Normal</SelectItem>
                                    <SelectItem value="font-medium text-base">Medio</SelectItem>
                                    <SelectItem value="font-semibold text-base">Semibold</SelectItem>
                                    <SelectItem value="font-bold text-base">Bold</SelectItem>
                                    <SelectItem value="font-extrabold text-base">Extra Bold</SelectItem>
                                    <SelectItem value="font-black text-base">Black</SelectItem>
                                    <SelectItem value="font-normal text-lg">Normal Grande</SelectItem>
                                    <SelectItem value="font-medium text-lg">Medio Grande</SelectItem>
                                    <SelectItem value="font-semibold text-lg">Semibold Grande</SelectItem>
                                    <SelectItem value="font-bold text-lg">Bold Grande</SelectItem>
                                    <SelectItem value="font-extrabold text-lg">Extra Bold Grande</SelectItem>
                                    <SelectItem value="font-black text-lg">Black Grande</SelectItem>
                                    <SelectItem value="font-normal text-xl">Normal XL</SelectItem>
                                    <SelectItem value="font-medium text-xl">Medio XL</SelectItem>
                                    <SelectItem value="font-semibold text-xl">Semibold XL</SelectItem>
                                    <SelectItem value="font-bold text-xl">Bold XL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Personalización de precios */}
                    <div className="space-y-2 border-t pt-4 mt-4">
                        <h3 className="text-sm font-medium text-zinc-900">Precios</h3>
                        
                        {/* Color del precio regular */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Color del precio ($ 3.500.000)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorPrice || 'zinc'}
                                    onValueChange={(value) => handleCardCustomizationChange('textColorPrice', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <SelectValue placeholder="Color" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <SelectItem value="black">Negro</SelectItem>
                                        <SelectItem value="red">Rojo</SelectItem>
                                        <SelectItem value="orange">Naranja</SelectItem>
                                        <SelectItem value="amber">Ámbar</SelectItem>
                                        <SelectItem value="yellow">Amarillo</SelectItem>
                                        <SelectItem value="lime">Lima</SelectItem>
                                        <SelectItem value="green">Verde</SelectItem>
                                        <SelectItem value="emerald">Esmeralda</SelectItem>
                                        <SelectItem value="teal">Verde azulado</SelectItem>
                                        <ColorSelectItem color="cyan" label="Cian" />
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadePrice || '900'}
                                    onValueChange={(value) => handleCardCustomizationChange('textShadePrice', value)}
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

                        {/* Color del precio original */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-500">Color del precio original ($ 4.200.000)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textColorOriginalPrice || 'zinc'}
                                    onValueChange={(value) => handleCardCustomizationChange('textColorOriginalPrice', value)}
                                >
                                    <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                                        <SelectValue placeholder="Color" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white max-h-[300px]">
                                        <SelectItem value="black">Negro</SelectItem>
                                        <SelectItem value="red">Rojo</SelectItem>
                                        <SelectItem value="orange">Naranja</SelectItem>
                                        <SelectItem value="amber">Ámbar</SelectItem>
                                        <SelectItem value="yellow">Amarillo</SelectItem>
                                        <SelectItem value="lime">Lima</SelectItem>
                                        <SelectItem value="green">Verde</SelectItem>
                                        <SelectItem value="emerald">Esmeralda</SelectItem>
                                        <SelectItem value="teal">Verde azulado</SelectItem>
                                        <ColorSelectItem color="cyan" label="Cian" />
                                        <ColorSelectItem color="sky" label="Cielo" />
                                        <ColorSelectItem color="blue" label="Azul" />
                                        <ColorSelectItem color="indigo" label="Índigo" />
                                        <ColorSelectItem color="violet" label="Violeta" />
                                        <ColorSelectItem color="purple" label="Morado" />
                                        <ColorSelectItem color="fuchsia" label="Fucsia" />
                                        <ColorSelectItem color="pink" label="Rosa" />
                                        <ColorSelectItem color="rose" label="Rosa fuerte" />
                                        <ColorSelectItem color="slate" label="Pizarra" />
                                        <ColorSelectItem color="zinc" label="Zinc" />
                                        <ColorSelectItem color="gray" label="Gris" />
                                        <ColorSelectItem color="neutral" label="Neutral" />
                                        <ColorSelectItem color="stone" label="Piedra" />
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={store.infoStage4.categorySelectToEdit?.cardSearchInCategory1?.textShadeOriginalPrice || '400'}
                                    onValueChange={(value) => handleCardCustomizationChange('textShadeOriginalPrice', value)}
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

            {/* Botones de navegación */}
            <div className="flex flex-row items-center justify-center gap-2 w-full max-w-lg">
                <button
                    type="button"
                    onClick={() => setCurrentStep("cards-inicio-web")}
                    className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-colors"
                >
                    <ArrowBigLeftDash className="w-4 h-4" />
                    atrás
                </button>
                <button
                    type="button"
                    onClick={() => setCurrentStep("cards-search-in-category")}
                    className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium rounded-xl transition-colors"
                >
                    <ArrowBigRightDash className="w-4 h-4" />
                    Siguiente personalización
                </button>
            </div>
        </div>
    )
}
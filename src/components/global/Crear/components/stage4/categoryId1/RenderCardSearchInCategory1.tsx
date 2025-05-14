import React, { useState, useEffect } from 'react'
import { ArrowBigLeftDash, ArrowBigRightDash, Eye, Heart, Star, CircleDashed, Layers, Square, Palette } from "lucide-react"
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
          <Badge className="absolute left-3 top-3 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-semibold z-10">Nuevo</Badge>
        )}
        {/* Corazón */}
        <button
          type="button"
          onClick={() => setFavorite(!favorite)}
          className="absolute right-3 top-3 z-10 bg-white rounded-full p-2 shadow-sm flex items-center justify-center"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          <Heart className={`h-5 w-5 ${favorite ? "fill-red-500 text-red-500" : "text-zinc-400"}`} />
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
          <Badge className="absolute left-3 bottom-3 bg-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold z-10">-{discount}%</Badge>
        )}
      </div>
      <CardContent className="pb-2 pt-4 px-5">
        <div className="mb-1 text-sm text-zinc-500">{category}</div>
        <h3 className="mb-2 font-semibold text-lg leading-tight">{name}</h3>
        <div className="flex items-center gap-1 mb-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-5 pt-4 gap-2 bg-white">
        <div className="flex flex-col w-full">
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-zinc-400 line-through truncate">$ {formatPrice(originalPrice)}</span>
          )}
          <span className="text-2xl font-bold text-zinc-900 truncate">$ {formatPrice(price)}</span>
        </div>
        <Button className="bg-zinc-900 hover:bg-zinc-800 text-white flex gap-2 px-4 py-2 rounded-lg">
          <Eye className="h-5 w-5" />
          <span>Detalle</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

export const RenderCardSearchInCategory1 = ({ setCurrentStep }: RenderInitialQuestionComponentProps) => {
    const store = useStore(crearStore)
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
          rounded: 'rounded-xl',
          shadow: 'shadow-md',
          hasBorder: false,
          borderWidth: 'border',
          borderColor: 'slate',
          borderShade: '500'
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
        const updatedState = {
          ...currentState,
          infoStage4: {
            ...currentState.infoStage4,
            businessCategories: currentState.infoStage4?.businessCategories?.map(cat => 
              cat.id === selectedCategory.id 
                ? {
                    ...cat,
                    cardSearchInCategory1: {
                      rounded: 'rounded-xl',
                      shadow: 'shadow-md',
                      hasBorder: false,
                      borderWidth: 'border',
                      borderColor: 'slate',
                      borderShade: '500'
                    }
                  }
                : cat
            ),
            categorySelectToEdit: {
              ...selectedCategory,
              cardSearchInCategory1: {
                rounded: 'rounded-xl',
                shadow: 'shadow-md',
                hasBorder: false,
                borderWidth: 'border',
                borderColor: 'slate',
                borderShade: '500'
              }
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
                <h1>Personalizando la categoría: <br /><strong>{store.infoStage4.categorySelectToEdit?.id} - {store.infoStage4.categorySelectToEdit?.title}</strong></h1>
                <div className="space-y-4 p-4 rounded-xl bg-zinc-50 w-full max-w-lg">
                    <div className="text-sm text-zinc-700">
                        <p className="font-medium mb-2">Personalización de tarjeta de búsqueda</p>
                        Esta tarjeta aparecerá en las búsquedas dentro de la categoría, permitiendo a sus usuarios visualizar los productos o servicios disponibles.
                    </div>
                </div>

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
                                        <SelectValue placeholder="Color de borde" />
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
                                        <SelectItem value="slate">Pizarra</SelectItem>
                                        <SelectItem value="zinc">Zinc</SelectItem>
                                        <SelectItem value="gray">Gris</SelectItem>
                                        <SelectItem value="neutral">Neutral</SelectItem>
                                        <SelectItem value="stone">Piedra</SelectItem>
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
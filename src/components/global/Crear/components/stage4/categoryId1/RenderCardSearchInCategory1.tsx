import React, { useState } from 'react'
import { ArrowBigLeftDash, ArrowBigRightDash, Eye, Heart, Star } from "lucide-react"
import { Badge } from "../../../../../ui/badge"
import { Button } from "../../../../../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../../../../../ui/card"
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

  const formatPrice = (price: number) => {
    return price.toLocaleString("es-CO", {
      maximumFractionDigits: 0,
    })
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg w-full max-w-sm rounded-xl">
      <CardHeader className="p-0 relative bg-zinc-100">
        <div className="relative aspect-square w-full flex items-start justify-between">
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
            className="h-full w-full object-cover rounded-t-xl"
            style={{ background: '#ededed' }}
          />
          {/* Badge Descuento */}
          {discount > 0 && (
            <Badge className="absolute left-3 bottom-3 bg-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold z-10">-{discount}%</Badge>
          )}
        </div>
      </CardHeader>
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

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
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
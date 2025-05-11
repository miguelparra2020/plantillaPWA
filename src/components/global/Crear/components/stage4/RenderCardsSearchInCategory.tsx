import React from 'react'
import { ArrowBigLeftDash, ArrowBigRightDash, Calendar, Clock, MapPin, Star } from "lucide-react"
import { Badge } from "../../../../ui/badge"
import { Button } from "../../../../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../../../../ui/card"
import { RenderInitialQuestionComponentProps } from "../../interfaces/modelsStage4"

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
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg w-full max-w-sm">
      <div className="relative">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="h-48 w-full object-cover"
        />
        {isPopular && <Badge className="absolute right-2 top-2 bg-yellow-500 hover:bg-yellow-600">Popular</Badge>}
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
          <Button className='w-full'>Agendar cita</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export const RenderCardsSearchInCategory = ({ setCurrentStep, handlePrev }: 
    RenderInitialQuestionComponentProps) => {
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

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center">
                {services.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                ))}
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
            onClick={() => setCurrentStep("cards-search-in-category")}
            className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
          >
              <ArrowBigRightDash className="w-4 h-4" />
              Siguiente personalización
          </button>
        </div>
        </div>
    )
}
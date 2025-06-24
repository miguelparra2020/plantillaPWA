import { ButtonGeneral } from '@globals'
import { generalConfig } from '@util/generalConfig'
import { ChevronLeft, ChevronRight, Scissors, Star } from 'lucide-react'
import  React, { useState, useEffect } from 'react'
import Img3 from "@img/carrusel/img3.webp"
import Img4 from "@img/carrusel/img4.webp"
import Img8 from "@img/carrusel/img8.webp"
import Img2 from "@img/carrusel/img2.webp"

const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % haircuts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? haircuts.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % haircuts.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }
    const haircuts = [
        {
          id: 1,
          title: "Fade Clásico",
          description: "Un corte atemporal que nunca pasa de moda. Perfecto para el hombre moderno que busca elegancia.",
          image: Img4,
          price: "$25",
          rating: 4.9,
          popular: true,
        },
        {
          id: 2,
          title: "Undercut Moderno",
          description: "Estilo contemporáneo con contraste marcado. Ideal para destacar tu personalidad única.",
          image: Img3,
          price: "$30",
          rating: 4.8,
          popular: false,
        },
        {
          id: 3,
          title: "Texturizado Premium",
          description: "Corte con textura y movimiento natural. Para quienes buscan un look sofisticado y versátil.",
          image: Img8,
          price: "$35",
          rating: 5.0,
          popular: true,
        },
        {
          id: 4,
          title: "Buzz Cut Profesional",
          description: "Corte militar refinado y práctico. Perfecto para el ejecutivo que valora la simplicidad.",
          image: Img2,
          price: "$20",
          rating: 4.7,
          popular: false,
        },
      ]
    return (<>
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Scissors className="h-8 w-8 text-slate-400" />
            <h1 className={generalConfig.classTitlesGeneral}>Cortes en Tendencia</h1>
            <Scissors className="h-8 w-8 text-slate-400 scale-x-[-1]" />
          </div>
          <p className={generalConfig.classParagraphGeneral}>
            Descubre los estilos más populares y modernos. Cada corte es una obra de arte diseñada para realzar tu
            personalidad.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden rounded-2xl max-w-3xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl mx-auto"
        >
          {/* Main Carousel */}
          <div className="relative h-[600px] sm:h-[350px]  mx-auto">
          <div
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
          {haircuts.map((haircut, index) => (
                <div key={haircut.id} className="w-full flex-shrink-0 relative">
                  <div className="flex flex-col lg:grid lg:grid-cols-2 h-full">
                    {/* Image Section */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 lg:h-full h-80 lg:aspect-auto aspect-square">
                      <img
                        src={haircut.image || "/placeholder.svg"}
                        alt={haircut.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />

                      {/* Popular Badge */}
                      {haircut.popular && (
                        <div className="absolute top-6 left-6 bg-slate-400 text-slate-900 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                          <Star className="h-4 w-4 fill-current" />
                          Popular
                        </div>
                      )}

                      {/* Price Badge */}
                      {/* <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-2 rounded-full font-bold text-lg border border-slate-300 shadow-lg">
                        {haircut.price}
                      </div> */}
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center p-8 sm:p-12  bg-gradient-to-br from-white to-slate-50">
                      <div className="space-y-1">
                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(haircut.rating) ? "text-slate-400 fill-current" : "text-slate-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-slate-600 font-medium">{haircut.rating} / 5.0</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl lg:text-xl pt-4 sm:pt-8 font-bold text-slate-900 leading-tight">{haircut.title}</h2>

                        {/* Description */}
                        <p className={generalConfig.classParagraphGeneral}>{haircut.description}</p>

                        {/* CTA Button */}
                        <div className="pt-2 sm:pt-10">
                        <ButtonGeneral
            as={generalConfig.Home.Wellcome.ButtonGeneralAs}
            href={generalConfig.Home.Wellcome.ButtonGeneralHref}
            className={generalConfig.Home.Wellcome.ButtonGeneralClass}
            children={generalConfig.Home.Wellcome.ButtonGeneralName}
            iconActive={generalConfig.Home.Wellcome.ButtonGeneralIconActive}
          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          </div>
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-slate-200 shadow-lg group"
          >
            <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-slate-200 shadow-lg group"
          >
            <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {haircuts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-slate-500 scale-125" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        {/* <div className="mt-6 max-w-md mx-auto">
          <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / haircuts.length) * 100}%` }}
            />
          </div>
        </div> */}
      </div>
    </div>
    </>)
}

export default Carrusel
import React, { useState, useRef, useEffect } from "react";
import { RenderInitialQuestionComponentProps } from "../../interfaces/modelsStage4";
import { ArrowBigLeftDash, ArrowBigRightDash, FileText, Layers, MousePointerClick, Store, Star, Heart, ThumbsUp, CheckCircle, Lightbulb, Gift, Calendar, BarChart, ShoppingCart, Trash2, ImageIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useStore } from "@nanostores/react";
import { crearStore } from "src/stores/crearStore";
import { colorOptionsTitles } from "../../helpers/helpersStage2";
import { iconOptionsToCard } from "../../helpers/helpersStage4";

export const RendersCardsInicioWeb = ({ setCurrentStep, handlePrev }:
    RenderInitialQuestionComponentProps) => {
        const store = useStore(crearStore)
        const searchInputRef = useRef<HTMLInputElement>(null)
        const [searchTerm, setSearchTerm] = useState('')
        const [filteredIcons, setFilteredIcons] = useState(iconOptionsToCard)

        useEffect(() => {
            if (searchInputRef.current) {
                searchInputRef.current.focus()
            }
        }, [searchTerm])

        const handleSettingsChange = (
            key: keyof typeof store.infoStage4.cardSettings | keyof typeof store.infoStage4.cardsInicio,
            value: string | boolean | number
          ) => {
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
          const optionsQuantityCards = [
            { name: "1", value: 1 },
            { name: "2", value: 2 },
            { name: "3", value: 3 },
            { name: "4", value: 4 },
            { name: "5", value: 5 },
            { name: "6", value: 6 },
            { name: "7", value: 7 },
            { name: "8", value: 8 },
            { name: "9", value: 9 },
            { name: "10", value: 10 },
            { name: "11", value: 11 },
            { name: "12", value: 12 }
          ]

            const titleColorClassCardsInicio = `text-${store.infoStage4.cardSettings.titleColor}-${colorOptionsTitles.find((c) => c.value === store.infoStage4.cardSettings.titleColor)?.titleShade || 700}`

            const paragraphColorClassCardsInicio = `text-${store.infoStage4.paragraphColor}-${colorOptionsTitles.find((c) => c.value === store.infoStage4.paragraphColor)?.paragraphShade || 600}`

            const paragraphColorClassCardSettings = `text-${store.infoStage4.cardSettings.paragraphColor}-${colorOptionsTitles.find((c) => c.value === store.infoStage4.cardSettings.paragraphColor)?.paragraphShade || 600}`

            const paragraphColorClassStage2 = `text-${store.infoStage2?.colorParagraph || 'stone'}-${store.infoStage2?.paragraphColorIntensity || 600}`

            const colorClassMap2 = {
                red: { 500: 'bg-red-500', 600: 'bg-red-600', 700: 'bg-red-700' },
                orange: { 500: 'bg-orange-500', 600: 'bg-orange-600', 700: 'bg-orange-700' },
                amber: { 500: 'bg-amber-500', 600: 'bg-amber-600', 700: 'bg-amber-700' },
                yellow: { 500: 'bg-yellow-500', 600: 'bg-yellow-600', 700: 'bg-yellow-700' },
                lime: { 500: 'bg-lime-500', 600: 'bg-lime-600', 700: 'bg-lime-700' },
                green: { 500: 'bg-green-500', 600: 'bg-green-600', 700: 'bg-green-700' },
                emerald: { 500: 'bg-emerald-500', 600: 'bg-emerald-600', 700: 'bg-emerald-700' },
                teal: { 500: 'bg-teal-500', 600: 'bg-teal-600', 700: 'bg-teal-700' },
                cyan: { 500: 'bg-cyan-500', 600: 'bg-cyan-600', 700: 'bg-cyan-700' },
                sky: { 500: 'bg-sky-500', 600: 'bg-sky-600', 700: 'bg-sky-700' },
                blue: { 500: 'bg-blue-500', 600: 'bg-blue-600', 700: 'bg-blue-700' },
                indigo: { 500: 'bg-indigo-500', 600: 'bg-indigo-600', 700: 'bg-indigo-700' },
                violet: { 500: 'bg-violet-500', 600: 'bg-violet-600', 700: 'bg-violet-700' },
                purple: { 500: 'bg-purple-500', 600: 'bg-purple-600', 700: 'bg-purple-700' },
                fuchsia: { 500: 'bg-fuchsia-500', 600: 'bg-fuchsia-600', 700: 'bg-fuchsia-700' },
                pink: { 500: 'bg-pink-500', 600: 'bg-pink-600', 700: 'bg-pink-700' },
                rose: { 500: 'bg-rose-500', 600: 'bg-rose-600', 700: 'bg-rose-700' },
                slate: { 500: 'bg-slate-500', 600: 'bg-slate-600', 700: 'bg-slate-700' },
                zinc: { 500: 'bg-zinc-500', 600: 'bg-zinc-600', 700: 'bg-zinc-700' },
                gray: { 500: 'bg-gray-500', 600: 'bg-gray-600', 700: 'bg-gray-700' },
                neutral: { 500: 'bg-neutral-500', 600: 'bg-neutral-600', 700: 'bg-neutral-700' },
                stone: { 500: 'bg-stone-500', 600: 'bg-stone-600', 700: 'bg-stone-700' },
              } as const

              const hoverColorClassMap = {
                red: { 500: 'hover:bg-red-700', 600: 'hover:bg-red-800', 700: 'hover:bg-red-900' },
                orange: { 500: 'hover:bg-orange-700', 600: 'hover:bg-orange-800', 700: 'hover:bg-orange-900' },
                amber: { 500: 'hover:bg-amber-700', 600: 'hover:bg-amber-800', 700: 'hover:bg-amber-900' },
                yellow: { 500: 'hover:bg-yellow-700', 600: 'hover:bg-yellow-800', 700: 'hover:bg-yellow-900' },
                lime: { 500: 'hover:bg-lime-700', 600: 'hover:bg-lime-800', 700: 'hover:bg-lime-900' },
                green: { 500: 'hover:bg-green-700', 600: 'hover:bg-green-800', 700: 'hover:bg-green-900' },
                emerald: { 500: 'hover:bg-emerald-700', 600: 'hover:bg-emerald-800', 700: 'hover:bg-emerald-900' },
                teal: { 500: 'hover:bg-teal-700', 600: 'hover:bg-teal-800', 700: 'hover:bg-teal-900' },
                cyan: { 500: 'hover:bg-cyan-700', 600: 'hover:bg-cyan-800', 700: 'hover:bg-cyan-900' },
                sky: { 500: 'hover:bg-sky-700', 600: 'hover:bg-sky-800', 700: 'hover:bg-sky-900' },
                blue: { 500: 'hover:bg-blue-700', 600: 'hover:bg-blue-800', 700: 'hover:bg-blue-900' },
                indigo: { 500: 'hover:bg-indigo-700', 600: 'hover:bg-indigo-800', 700: 'hover:bg-indigo-900' },
                violet: { 500: 'hover:bg-violet-700', 600: 'hover:bg-violet-800', 700: 'hover:bg-violet-900' },
                purple: { 500: 'hover:bg-purple-700', 600: 'hover:bg-purple-800', 700: 'hover:bg-purple-900' },
                fuchsia: { 500: 'hover:bg-fuchsia-700', 600: 'hover:bg-fuchsia-800', 700: 'hover:bg-fuchsia-900' },
                pink: { 500: 'hover:bg-pink-700', 600: 'hover:bg-pink-800', 700: 'hover:bg-pink-900' },
                rose: { 500: 'hover:bg-rose-700', 600: 'hover:bg-rose-800', 700: 'hover:bg-rose-900' },
                slate: { 500: 'hover:bg-slate-700', 600: 'hover:bg-slate-800', 700: 'hover:bg-slate-900' },
                zinc: { 500: 'hover:bg-zinc-700', 600: 'hover:bg-zinc-800', 700: 'hover:bg-zinc-900' },
                gray: { 500: 'hover:bg-gray-700', 600: 'hover:bg-gray-800', 700: 'hover:bg-gray-900' },
                neutral: { 500: 'hover:bg-neutral-700', 600: 'hover:bg-neutral-800', 700: 'hover:bg-neutral-900' },
                stone: { 500: 'hover:bg-stone-700', 600: 'hover:bg-stone-800', 700: 'hover:bg-stone-900' },
              } as const

              const getHoverShadow = (shadow: string) => {
                if (shadow === "shadow-none") return "shadow-sm"
                if (shadow === "shadow-sm") return "shadow"
                if (shadow === "shadow") return "shadow-md"
                if (shadow === "shadow-md") return "shadow-lg"
                if (shadow === "shadow-lg") return "shadow-xl"
                if (shadow === "shadow-xl") return "shadow-2xl"
                if (shadow === "shadow-2xl") return "shadow-2xl"
                return shadow
              }

              const borderColorClassMap = {
                red: { 500: 'border-red-500', 600: 'border-red-600', 700: 'border-red-700' },
                orange: { 500: 'border-orange-500', 600: 'border-orange-600', 700: 'border-orange-700' },
                amber: { 500: 'border-amber-500', 600: 'border-amber-600', 700: 'border-amber-700' },
                yellow: { 500: 'border-yellow-500', 600: 'border-yellow-600', 700: 'border-yellow-700' },
                lime: { 500: 'border-lime-500', 600: 'border-lime-600', 700: 'border-lime-700' },
                green: { 500: 'border-green-500', 600: 'border-green-600', 700: 'border-green-700' },
                emerald: { 500: 'border-emerald-500', 600: 'border-emerald-600', 700: 'border-emerald-700' },
                teal: { 500: 'border-teal-500', 600: 'border-teal-600', 700: 'border-teal-700' },
                cyan: { 500: 'border-cyan-500', 600: 'border-cyan-600', 700: 'border-cyan-700' },
                sky: { 500: 'border-sky-500', 600: 'border-sky-600', 700: 'border-sky-700' },
                blue: { 500: 'border-blue-500', 600: 'border-blue-600', 700: 'border-blue-700' },
                indigo: { 500: 'border-indigo-500', 600: 'border-indigo-600', 700: 'border-indigo-700' },
                violet: { 500: 'border-violet-500', 600: 'border-violet-600', 700: 'border-violet-700' },
                purple: { 500: 'border-purple-500', 600: 'border-purple-600', 700: 'border-purple-700' },
                fuchsia: { 500: 'border-fuchsia-500', 600: 'border-fuchsia-600', 700: 'border-fuchsia-700' },
                pink: { 500: 'border-pink-500', 600: 'border-pink-600', 700: 'border-pink-700' },
                rose: { 500: 'border-rose-500', 600: 'border-rose-600', 700: 'border-rose-700' },
                slate: { 500: 'border-slate-500', 600: 'border-slate-600', 700: 'border-slate-700' },
                zinc: { 500: 'border-zinc-500', 600: 'border-zinc-600', 700: 'border-zinc-700' },
                gray: { 500: 'border-gray-500', 600: 'border-gray-600', 700: 'border-gray-700' },
                neutral: { 500: 'border-neutral-500', 600: 'border-neutral-600', 700: 'border-neutral-700' },
                stone: { 500: 'border-stone-500', 600: 'border-stone-600', 700: 'border-stone-700' },
              } as const
            
            
            

            const buttonClasses = `
    px-2 md:py-1 md:px-4 text-white text-[6px] md:text-[8px] flex flex-row items-center justify-center
    ${store.infoStage3?.rounded || 'rounded'}
    bg-${store.infoStage3?.bgColor || 'blue'}-${store.infoStage3?.bgShade || 500}
    hover:bg-${store.infoStage3?.bgColor || 'blue'}-${Math.min((store.infoStage3?.bgShade || 500) + 100, 900)}
    ${store.infoStage3?.shadow || 'shadow'}
    hover:${store.infoStage3?.shadow === 'shadow-none' ? 'shadow-sm' : 
           store.infoStage3?.shadow === 'shadow-sm' ? 'shadow' :
           store.infoStage3?.shadow === 'shadow' ? 'shadow-md' :
           store.infoStage3?.shadow === 'shadow-md' ? 'shadow-lg' :
           store.infoStage3?.shadow === 'shadow-lg' ? 'shadow-xl' :
           store.infoStage3?.shadow === 'shadow-xl' ? 'shadow-2xl' :
           store.infoStage3?.shadow === 'shadow-2xl' ? 'shadow-2xl' :
           'shadow-md'}
    ${store.infoStage3?.buttonFont || ''}
    ${store.infoStage3?.buttonWeight || 'font-normal'}
    ${store.infoStage3?.buttonSize === 'small' ? 'text-[4px] md:text-[6px]' :
      store.infoStage3?.buttonSize === 'large' ? 'text-[8px] md:text-[10px]' :
      'text-[6px] md:text-[8px]'}
    ${store.infoStage3?.hasBorder ? `${store.infoStage3?.borderWidth || 'border'} border-${store.infoStage3?.borderColor || 'blue'}-${store.infoStage3?.borderShade || 500}` : ""}
    transition-all duration-200
`

  const cardClasses2 = `
    overflow-hidden
    ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.rounded || 'rounded-lg'}
    ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.shadow || 'shadow-md'}
    ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.hasBorder ? `${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.borderWidth || 'border'} border-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.borderColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.borderShade || '500'}` : ""}
    bg-white w-[70px] md:w-[120px]
  `

  // Generar clases para el texto
  const textClasses = `${store.infoStage4.cardSettings.textAlign}`  

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


  const getIconColor = (color: string) => {
    return colorMap[color as keyof typeof colorMap] || color
  }

  const [iconColor, setIconColor] = useState<string>('slate')

  const renderIcon = (color: string = 'currentColor') => {
    const iconColor = getIconColor(color)
    switch (store.infoStage4.cardSettings.icon) {
      case "star":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        )
      case "heart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
          </svg>
        )
      case "thumbs-up":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M7 10v12"></path>
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
          </svg>
        )
      case "check-circle":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        )
      case "lightbulb":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
            <path d="M9 18h6"></path>
            <path d="M10 22h4"></path>
          </svg>
        )
      case "gift":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 1 0-5C13 2 12 7 12 7z"></path>
          </svg>
        )
      case "calendar":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        )
      case "bar-chart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        )
      case "shopping-cart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-2 h-2"
          >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        )
    }
  }

  const titleColorClass2 = `text-${store.infoStage4.cardSettings.titleColor}-${colorOptionsTitles.find((c) => c.value === store.infoStage4.cardSettings.titleColor)?.titleShade || 700}`

  const paragraphColorClass2 = `text-${store.infoStage4.cardSettings.paragraphColor}-${colorOptionsTitles.find((c) => c.value === store.infoStage4.cardSettings.paragraphColor)?.paragraphShade || 600}`

  const cardClasses3 = `
  overflow-hidden
  ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.rounded || 'rounded-lg'}
  ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.shadow || 'shadow-md'}
  ${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.hasBorder ? `${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.borderWidth || 'border'} border-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.borderColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.borderShade || '500'}` : ""}
  bg-white w-[230px] md:w-[230px]
`

  const titleColorClass = `text-${store.infoStage2?.colorTitles || 'red'}-${store.infoStage2?.titleColorIntensity || 700}`
  const paragraphColorClass = `text-${store.infoStage2?.colorParagraph || 'stone'}-${store.infoStage2?.paragraphColorIntensity || 600}`

  return (
            <>
             
             <form  className="flex flex-col gap-4 flex-1 p-4 justify-between items-center">
      <h1>Personalizando la categoría: <br /><strong>{store.infoStage4.categorySelectToEdit?.title}</strong></h1>
      <div className="space-y-4 p-4 rounded-xl bg-zinc-50  ">
        <div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Personzalización visual de apariencia en el inicio web</p>
          En este apartado podrá personalizar la forma como aparecerá en el inicio de la plataforma la card o cads que personalizó, en esta o estas cards puede indicar categorias o realizar una invitación al usuario para que ingrese al área seleccionada
        </div>
      </div>

      {/* Contenido */}
      <div className="space-y-4 p-4 rounded-xl bg-zinc-50 ">
          <h4 className="text-sm font-medium text-zinc-900 ">Contenido invitación para ingresar al área de todos los productos</h4>
          {/* Título de la sesión de productos */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Store className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>Título de la sesión de productos</span>
            </div>
            <Input
              type='text'
              placeholder='Ejemplo: Descubre Nuestra Colección'
              value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleSesionCardsInicio || ''}
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
                          titleSesionCardsInicio: e.target.value
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
                          titleSesionCardsInicio: e.target.value
                        }
                      }
                    }
                  })
                }
              }}
              className='w-full bg-zinc-100  text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 '
            />
          </div>

          {/* Descripción */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <FileText className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>Descripción de la sesión productos</span>
            </div>
            <Textarea
              placeholder='Ejemplo: Explora una selección única de productos diseñados para ti.'
              value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.descriptionSesionCardsInicio || ''}
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
                          descriptionSesionCardsInicio: e.target.value
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
                          descriptionSesionCardsInicio: e.target.value
                        }
                      }
                    }
                  })
                }
              }}
              className='w-full bg-zinc-100  text-sm text-zinc-900  placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900  min-h-[100px]'
            />
          </div>

          {/* Nombre de botón */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <MousePointerClick className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>Nombre del botón de invitación a ver la categoría</span>
            </div>
            <Input
              type='text'
              placeholder='Ejemplo: Ver categoría'
              value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.nameButtonSesionCardsInicio || ''}
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
                          nameButtonSesionCardsInicio: e.target.value
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
                          nameButtonSesionCardsInicio: e.target.value
                        }
                      }
                    }
                  })
                }
              }}
              className='w-full bg-zinc-100  text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 '
            />
          </div>

          {/* Cantidad de cards */}
          <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-500" />
                  <span className="text-sm text-zinc-500">Cantidad de cards. "Pueden ser las categorías"</span>
                </div>
                <Select
                      value={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio?.toString() ?? '0'}
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
                                  quantityCardsSesionCardsInicio: parseInt(value) || 0
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
                                  quantityCardsSesionCardsInicio: parseInt(value) || 0
                                }
                              }
                            }
                          })
                        }
                      }}
                    >
                      <SelectTrigger className="w-full h-10 bg-zinc-100 border-zinc-200 rounded-xl">
                        <SelectValue placeholder="Cantidad" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                      {optionsQuantityCards.map((item) => (
                        <SelectItem key={item.value} value={item.value.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                      </SelectContent>
                </Select>
              </div>

          {/* Cards */}
          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio > 0 ?
          Array.from({ length: store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio }).map((_, index) => {
            const cardsDetails = store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio || [];
            const currentCard = cardsDetails[index] || { cardTitle: '', detailCard: '', iconCard: 'star' };
            
            return (
              <div key={index} >
                <div className="space-y-4 p-4 rounded-xl border border-gray-600 ">
                  {/* Título de la card*/}
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Store className='w-4 h-4 text-zinc-500' />
                      <span className='text-sm text-zinc-500'>Título de la card {index+1}</span>
                    </div>
                    <Input
                      type='text'
                      placeholder='Ejemplo: Ofertas'
                      value={currentCard.cardTitle}
                      onChange={(e) => {
                        const currentState = crearStore.get()
                        const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                        if (selectedCategory) {
                          const updatedCardsDetails = [...(selectedCategory.cardInicioSettings.cardsDetailsSesionCardsInicio || [])]
                          while (updatedCardsDetails.length <= index) {
                            updatedCardsDetails.push({ cardTitle: '', detailCard: '', iconCard: 'star' })
                          }
                          updatedCardsDetails[index] = { ...updatedCardsDetails[index], cardTitle: e.target.value }

                          const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                            if (cat.id === selectedCategory.id) {
                              return {
                                ...cat,
                                cardInicioSettings: {
                                  ...cat.cardInicioSettings,
                                  cardsDetailsSesionCardsInicio: updatedCardsDetails
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
                                  cardsDetailsSesionCardsInicio: updatedCardsDetails
                                }
                              }
                            }
                          })
                        }
                      }}
                      className='w-full bg-zinc-100  text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 '
                    />
                  </div>

                  {/* Icono de la card */}
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <Star className='w-4 h-4 text-zinc-500' />
                      <span className='text-sm text-zinc-500'>Icono de la card {index+1}</span>
                    </div>
                    <Select
                      value={currentCard.iconCard}
                      onValueChange={(value) => {
                        const currentState = crearStore.get()
                        const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                        if (selectedCategory) {
                          const updatedCardsDetails = [...(selectedCategory.cardInicioSettings.cardsDetailsSesionCardsInicio || [])]
                          while (updatedCardsDetails.length <= index) {
                            updatedCardsDetails.push({ cardTitle: '', detailCard: '', iconCard: 'star' })
                          }
                          updatedCardsDetails[index] = { ...updatedCardsDetails[index], iconCard: value }

                          const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                            if (cat.id === selectedCategory.id) {
                              return {
                                ...cat,
                                cardInicioSettings: {
                                  ...cat.cardInicioSettings,
                                  cardsDetailsSesionCardsInicio: updatedCardsDetails
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
                                  cardsDetailsSesionCardsInicio: updatedCardsDetails
                                }
                              }
                            }
                          })
                        }
                      }}
                    >
                      <SelectTrigger className="w-full h-14 bg-zinc-100 border-zinc-200 rounded-xl">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const IconComponent = iconOptionsToCard.find(opt => opt.value === currentCard.iconCard)?.icon || Star
                            return <IconComponent className="w-4 h-4 text-zinc-500" />
                          })()}
                          <SelectValue placeholder="Seleccione un icono" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="h-[300px] bg-white">
                        <div className="p-2 bg-white border-b sticky top-0 z-10">
                          <div className="flex items-center gap-2">
                            <Input
                              type="text"
                              placeholder="Buscar icono..."
                              className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                              value={searchTerm}
                              onChange={(e) => {
                                const term = e.target.value.toLowerCase()
                                setSearchTerm(term)
                                const filteredIcons = iconOptionsToCard.filter(icon => 
                                  icon.name.toLowerCase().includes(term)
                                )
                                setFilteredIcons(filteredIcons)
                              }}
                              autoFocus
                              onKeyDown={(e) => e.stopPropagation()}
                              onKeyUp={(e) => e.stopPropagation()}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setSearchTerm('')
                                setFilteredIcons(iconOptionsToCard)
                              }}
                              className="p-2 hover:bg-zinc-100 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4 text-zinc-500" />
                            </button>
                          </div>
                        </div>
                        <div className="overflow-y-auto">
                          <div className="grid grid-cols-3 gap-2 p-2">
                            {filteredIcons.map((option) => {
                              const IconComponent = option.icon
                              return (
                                <SelectItem 
                                  key={option.value} 
                                  value={option.value}
                                  className="flex items-center justify-center p-2 hover:bg-zinc-100 rounded-lg"
                                >
                                  <div className="flex flex-col items-center gap-1">
                                    <IconComponent className="w-6 h-6 text-zinc-500" />
                                    <span className="text-xs text-center">{option.name}</span>
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </div>
                        </div>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Detalle de la card */}
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <FileText className='w-4 h-4 text-zinc-500' />
                      <span className='text-sm text-zinc-500'>Detalle de la card {index+1}</span>
                    </div>
                    <Textarea
                      placeholder='Ejemplo: Descubre nuestras mejores ofertas'
                      value={currentCard.detailCard}
                      onChange={(e) => {
                        const currentState = crearStore.get()
                        const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                        if (selectedCategory) {
                          const updatedCardsDetails = [...(selectedCategory.cardInicioSettings.cardsDetailsSesionCardsInicio || [])]
                          while (updatedCardsDetails.length <= index) {
                            updatedCardsDetails.push({ cardTitle: '', detailCard: '', iconCard: 'star' })
                          }
                          updatedCardsDetails[index] = { ...updatedCardsDetails[index], detailCard: e.target.value }

                          const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                            if (cat.id === selectedCategory.id) {
                              return {
                                ...cat,
                                cardInicioSettings: {
                                  ...cat.cardInicioSettings,
                                  cardsDetailsSesionCardsInicio: updatedCardsDetails
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
                                  cardsDetailsSesionCardsInicio: updatedCardsDetails
                                }
                              }
                            }
                          })
                        }
                      }}
                      className='w-full bg-zinc-100  text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 min-h-[100px]'
                    />
                  </div>

                  {/* Imagen de la card */}
                  {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && (
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2'>
                        <ImageIcon className='w-4 h-4 text-zinc-500' />
                        <span className='text-sm text-zinc-500'>Imagen de la card {index+1}</span>
                      </div>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              const currentState = crearStore.get()
                              const selectedCategory = currentState.infoStage4?.categorySelectToEdit
                              if (selectedCategory) {
                                const updatedCardsDetails = [...(selectedCategory.cardInicioSettings.cardsDetailsSesionCardsInicio || [])]
                                while (updatedCardsDetails.length <= index) {
                                  updatedCardsDetails.push({ cardTitle: '', detailCard: '', iconCard: 'star' })
                                }
                                updatedCardsDetails[index] = { 
                                  ...updatedCardsDetails[index], 
                                  imageCard: reader.result as string 
                                }

                                const updatedCategories = currentState.infoStage4?.businessCategories?.map(cat => {
                                  if (cat.id === selectedCategory.id) {
                                    return {
                                      ...cat,
                                      cardInicioSettings: {
                                        ...cat.cardInicioSettings,
                                        cardsDetailsSesionCardsInicio: updatedCardsDetails
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
                                        cardsDetailsSesionCardsInicio: updatedCardsDetails
                                      }
                                    }
                                  }
                                })
                              }
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className='w-full bg-zinc-100 text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900'
                      />
                      {currentCard.imageCard && (
                        <div className="mt-2">
                          <img 
                            src={currentCard.imageCard} 
                            alt="Preview" 
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          }) : null}

          
      </div>
      <div className="space-y-4 p-4 rounded-xl border border-zinc-200">
        <div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Visualización tipo WEB</p>       
        </div>

      <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] md:h-[294px] w-[301px] md:w-[412px]">
        <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:bg-gray-600/20 [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="w-full mt-4 flex flex-col justify-center items-center">
            <h2 className={`text-[8px] ${store.infoStage2?.titleWeight || 'font-bold'} ${titleColorClass} ${store.infoStage2?.titleFont || ''} mb-4`}>
              {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleSesionCardsInicio || 'Título de la sesión'}
            </h2>
          </div>

          {/* Layout para una sola card */}
          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio === 1 && (
            <div className="flex flex-row items-center justify-center">
              <div className="w-[50%] h-[120px] md:h-[224px] flex flex-col items-center justify-center"> 
                <div className="w-[90%] pb-4 flex flex-col items-center justify-center text-center">
                  <p className={`text-[6px] ${store.infoStage2?.paragraphWeight || 'font-normal'} ${paragraphColorClassStage2} ${store.infoStage2?.paragraphFont || ''} mb-6`}>
                    {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.descriptionSesionCardsInicio || 'Descripción de la sesión'}
                  </p>
                </div>

                <div className="w-[90%] pb-2 flex flex-col items-center justify-center text-center">
                  <button type="button" className={buttonClasses}>
                    {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.nameButtonSesionCardsInicio || 'Ver categoría'} &nbsp; 
                    <ArrowBigRightDash className='w-2 md:w-3 h-4' />
                  </button>
                </div>
              </div>
              <div className="w-[50%] flex flex-col items-center justify-center"> 
                <div>
                  {/* Vista previa de la card */}
                  <div className={cardClasses2}>
                    {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && (
                      <div className="relative">
                        <img
                          src={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[0]?.imageCard || "https://flowbite.com/docs/images/examples/image-3@2x.jpg"}
                          alt="Card preview"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className={`p-1 md:p-2 ${textClasses}`}>
                      <div className="flex flex-col gap-0.5 md:gap-1">
                        {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === "text-center" && (
                          <div className="mx-auto">
                            {(() => {
                              const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[0]?.iconCard)?.icon || Star;
                              return <IconComponent className={`w-2 h-2 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />;
                            })()}
                          </div>
                        )}
                        {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === "text-right" && (
                          <div className="ml-auto">
                            {(() => {
                              const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[0]?.iconCard)?.icon || Star;
                              return <IconComponent className={`w-2 h-2 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />;
                            })()}
                          </div>
                        )}
                        {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === "text-left" && (
                          <div>
                            {(() => {
                              const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[0]?.iconCard)?.icon || Star;
                              return <IconComponent className={`w-2 h-2 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />;
                            })()}
                          </div>
                        )}
                        <span className={`text-[4px] md:text-[6px] ${store.infoStage2?.titleWeight || 'font-bold'} ${titleColorClass} ${store.infoStage2?.titleFont || ''}`}>
                          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[0]?.cardTitle || 'Título de la card'}
                        </span>
                        <p className={`text-[4px] ${store.infoStage2?.paragraphWeight || 'font-normal'} ${paragraphColorClassStage2} ${store.infoStage2?.paragraphFont || ''}`}>
                          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[0]?.detailCard || 'Descripción de la card'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Layout para múltiples cards */}
          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio > 1 && (
            <div className="flex flex-col items-center justify-center w-full">
              <div className="w-[90%] pb-2 flex flex-col items-center justify-center text-center">
                <p className={`text-[6px] ${store.infoStage2?.paragraphWeight || 'font-normal'} ${paragraphColorClassStage2} ${store.infoStage2?.paragraphFont || ''} mb-2`}>
                  {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.descriptionSesionCardsInicio || 'Descripción de la sesión'}
                </p>
              </div>

              <div className="w-full flex justify-center">
                <div className="grid grid-cols-3 gap-2 max-w-[300px] md:max-w-[400px]">
                  {Array.from({ length: Math.min(store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio || 0, 3) }).map((_, index) => (
                    <div key={index} className={cardClasses2}>
                      {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.imageCard && (
                        <div className="relative w-full aspect-square overflow-hidden">
                          <img
                            src={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.imageCard}
                            alt={`Card preview ${index + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className={`p-1 md:p-2 ${textClasses}`}>
                        <div className="flex flex-col gap-0.5 md:gap-1">
                          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === "text-center" && (
                            <div className="mx-auto">
                              {(() => {
                                const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.iconCard)?.icon || Star;
                                return <IconComponent className={`w-2 h-2 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />;
                              })()}
                            </div>
                          )}
                          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === "text-right" && (
                            <div className="ml-auto">
                              {(() => {
                                const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.iconCard)?.icon || Star;
                                return <IconComponent className={`w-2 h-2 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />;
                              })()}
                            </div>
                          )}
                          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === "text-left" && (
                            <div>
                              {(() => {
                                const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.iconCard)?.icon || Star;
                                return <IconComponent className={`w-2 h-2 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />;
                              })()}
                            </div>
                          )}
                          <span className={`text-[4px] md:text-[6px] ${store.infoStage2?.titleWeight || 'font-bold'} ${titleColorClass} ${store.infoStage2?.titleFont || ''}`}>
                            {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.cardTitle || `Título de la card ${index + 1}`}
                          </span>
                          <p className={`text-[4px] ${store.infoStage2?.paragraphWeight || 'font-normal'} ${paragraphColorClassStage2} ${store.infoStage2?.paragraphFont || ''}`}>
                            {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.detailCard || `Descripción de la card ${index + 1}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="w-full mt-2 pb-2 flex flex-col items-center justify-center text-center">
                <button type="button" className={buttonClasses}>
                  {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.nameButtonSesionCardsInicio || 'Ver categoría'} &nbsp; 
                  <ArrowBigRightDash className='w-2 md:w-3 h-4' />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

<div className="relative mx-auto bg-gray-900 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
    <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
</div>

<div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Visualización tipo Móvil</p>       
        </div>


<div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
    <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
    <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
    <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white overflow-y-auto [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-thumb]:bg-gray-600/20 [&::-webkit-scrollbar-track]:bg-transparent">
      <div className="w-full mt-20 flex flex-col justify-center items-center">
        <h6 className={`text-[8px] ${store.infoStage2?.titleWeight || 'font-bold'} ${titleColorClass} ${store.infoStage2?.titleFont || ''} mb-2`}>
          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.titleSesionCardsInicio || 'Título de la sesión'}
        </h6>
      </div>
      <div className="flex mt-4 flex-col items-center justify-center">
        <div className="w-[90%] pb-4 flex flex-col items-center justify-center text-center">
          <p className={`text-[6px] ${store.infoStage2?.paragraphWeight || 'font-normal'} ${paragraphColorClassStage2} ${store.infoStage2?.paragraphFont || ''}`}>
            {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.descriptionSesionCardsInicio || 'Descripción de la sesión'}
          </p>
        </div>
      </div>
      <div className="flex mt-4 flex-col items-center justify-center">
        {/* Vista previa de las cards */}
        <div className="w-full px-4 grid grid-cols-1 gap-2">
          {Array.from({ length: store.infoStage4.categorySelectToEdit?.cardInicioSettings?.quantityCardsSesionCardsInicio || 0 }).map((_, index) => (
            <div key={index} className={cardClasses3}>
              {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.showImage && store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.imageCard && (
                <div className="relative w-full aspect-square overflow-hidden">
                  <img
                    src={store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.imageCard}
                    alt={`Card preview ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <div className={`p-2 md:p-4 ${textClasses}`}>
                <div className="flex flex-col gap-0.5 md:gap-1">
                  {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === "text-center" && (
                    <div className="mx-auto">
                      {(() => {
                        const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.iconCard)?.icon || Star;
                        return <IconComponent className={`w-2 h-2 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />;
                      })()}
                    </div>
                  )}
                  {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === "text-right" && (
                    <div className="ml-auto">
                      {(() => {
                        const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.iconCard)?.icon || Star;
                        return <IconComponent className={`w-2 h-2 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />;
                      })()}
                    </div>
                  )}
                  {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.textAlign === "text-left" && (
                    <div>
                      {(() => {
                        const IconComponent = iconOptionsToCard.find(opt => opt.value === store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.iconCard)?.icon || Star;
                        return <IconComponent className={`w-2 h-2 text-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColor || 'slate'}-${store.infoStage4.categorySelectToEdit?.cardInicioSettings?.iconColorShade || 500}`} />;
                      })()}
                    </div>
                  )}
                  <span className={`text-[6px] ${store.infoStage2?.titleWeight || 'font-bold'} ${titleColorClass} ${store.infoStage2?.titleFont || ''}`}>
                    {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.cardTitle || `Título de la card ${index + 1}`}
                  </span>
                  <p className={`text-[4px] ${store.infoStage2?.paragraphWeight || 'font-normal'} ${paragraphColorClassStage2} ${store.infoStage2?.paragraphFont || ''}`}>
                    {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.cardsDetailsSesionCardsInicio[index]?.detailCard || `Descripción de la card ${index + 1}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-6 pb-2 flex flex-col items-center justify-center text-center">
        <button type="button" className={buttonClasses}>
          {store.infoStage4.categorySelectToEdit?.cardInicioSettings?.nameButtonSesionCardsInicio || 'Ver categoría'} &nbsp; 
          <ArrowBigRightDash className='w-4 md:w-5 h-6' />
        </button>
      </div>
    </div>
</div>

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
        //   onClick={() => handleNext()}
          className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
            <ArrowBigRightDash className="w-4 h-4" />
            Siguiente personalización
        </button>
      </div>
    </form>
            </>
        )
    }
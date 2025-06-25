
import React, { useState } from "react"
import { Palette, Type, MousePointer, Sparkles, Check, ChevronDown } from "lucide-react"
import { Button } from "@component/ui/button"
import { Card, CardContent } from "@component/ui/card"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Switch } from "../ui/switch"

const Stage2Settings = () => {
  const [colors, setColors] = useState({
    titles: "#1f2937",
    paragraphs: "#6b7280",
    buttons: "#3b82f6",
    icons: "#10b981",
    general: "#f3f4f6",
  })
  const [titleStyle, setTitleStyle] = useState({
    isGradient: false,
    gradientClass: "",
    value: "#1f2937",
  })
  const [buttonStyle, setButtonStyle] = useState({
    isGradient: false,
    gradientClass: "",
    hoverClass: "",
    shadowClass: "",
    focusClass: "",
    textColor: "text-white",
    value: "#3b82f6",
  })
  const [selectedButtonStyle, setSelectedButtonStyle] = useState("")
  const [bordersEnabled, setBordersEnabled] = useState(false)
  const [shadowsEnabled, setShadowsEnabled] = useState(false)

  // Reemplazar la sección de fontOptions con estas combinaciones de fuentes:

  const fontCombinations = [
    {
      id: "modern-clean",
      name: "Moderno y Limpio",
      titleFont: { value: "font-sans", name: "Sans Serif", class: "font-sans font-extrabold text-4xl" },
      paragraphFont: { value: "font-sans", name: "Sans Serif", class: "font-sans font-normal text-base" },
      preview: { title: "Aa", paragraph: "Aa" },
    },
    {
      id: "elegant-classic",
      name: "Elegante y Clásico",
      titleFont: { value: "font-serif", name: "Serif", class: "font-serif font-extrabold text-4xl" },
      paragraphFont: {
        value: "font-sans",
        name: "Sans Serif",
        class: "font-sans font-normal text-base",
      },
      preview: { title: "Aa", paragraph: "Aa" },
    },
    {
      id: "friendly-approachable",
      name: "Amigable y Accesible",
      titleFont: { value: "font-sans", name: "Sans Serif", class: "font-sans font-bold text-4xl" },
      paragraphFont: { value: "font-sans", name: "Sans Serif", class: "font-sans font-light text-base" },
      preview: { title: "Aa", paragraph: "Aa" },
    },
    {
      id: "professional-corporate",
      name: "Profesional y Corporativo",
      titleFont: { value: "font-sans", name: "Sans Serif", class: "font-sans font-black text-4xl" },
      paragraphFont: { value: "font-sans", name: "Sans Serif", class: "font-sans font-medium text-base" },
      preview: { title: "Aa", paragraph: "Aa" },
    },
    {
      id: "sophisticated-refined",
      name: "Sofisticado y Refinado",
      titleFont: { value: "font-serif", name: "Serif", class: "font-serif font-bold text-4xl" },
      paragraphFont: {
        value: "font-serif",
        name: "Serif",
        class: "font-serif font-normal text-base",
      },
      preview: { title: "Aa", paragraph: "Aa" },
    },
    {
      id: "classic-traditional",
      name: "Clásico y Tradicional",
      titleFont: { value: "font-serif", name: "Serif", class: "font-serif font-extrabold text-4xl" },
      paragraphFont: { value: "font-serif", name: "Serif", class: "font-serif font-normal text-base" },
      preview: { title: "Aa", paragraph: "Aa" },
    },
    {
      id: "tech-minimal",
      name: "Tecnológico y Minimal",
      titleFont: { value: "font-mono", name: "Monospace", class: "font-mono font-extrabold text-4xl" },
      paragraphFont: { value: "font-sans", name: "Sans Serif", class: "font-sans font-normal text-base" },
      preview: { title: "Aa", paragraph: "Aa" },
    },
    {
      id: "creative-bold",
      name: "Creativo y Audaz",
      titleFont: { value: "font-sans", name: "Sans Serif", class: "font-sans font-black text-4xl tracking-tight" },
      paragraphFont: { value: "font-mono", name: "Monospace", class: "font-mono font-normal text-base" },
      preview: { title: "Aa", paragraph: "Aa" },
    },
  ]

  // Actualizar el estado para manejar las combinaciones de fuentes:
  const [selectedFontCombination, setSelectedFontCombination] = useState("")
  const [fontStyles, setFontStyles] = useState({
    titleClass: "font-sans font-extrabold text-4xl",
    paragraphClass: "font-sans font-normal text-base",
    titleFont: "Sans",
    paragraphFont: "Sans",
  })

  // Función para manejar el cambio de combinación de fuentes:
  const handleFontCombinationChange = (combinationId: string) => {
    const combination = fontCombinations.find((combo) => combo.id === combinationId)
    if (combination) {
      setFontStyles({
        titleClass: combination.titleFont.class,
        paragraphClass: combination.paragraphFont.class,
        titleFont: combination.titleFont.name,
        paragraphFont: combination.paragraphFont.name,
      })
    }
  }

  // Opciones de gradientes para títulos
  const titleGradients = [
    {
      name: "Gradiente Ámbar",
      value: "gradient-amber",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-amber-600 to-amber-800",
    },
    {
      name: "Gradiente Azul",
      value: "gradient-blue",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-blue-500 to-blue-800",
    },
    {
      name: "Gradiente Dorado",
      value: "gradient-gold",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800",
    },
    {
      name: "Gradiente Red",
      value: "gradient-red",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-red-400 via-red-600 to-red-800",
    },
    {
      name: "Gradiente Orange",
      value: "gradient-orange",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800",
    },
    {
      name: "Gradiente Amber",
      value: "gradient-amber-auto",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800",
    },
    {
      name: "Gradiente Yellow",
      value: "gradient-yellow",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-800",
    },
    {
      name: "Gradiente Lime",
      value: "gradient-lime",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-lime-400 via-lime-600 to-lime-800",
    },
    {
      name: "Gradiente Green",
      value: "gradient-green",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-green-400 via-green-600 to-green-800",
    },
    {
      name: "Gradiente Emerald",
      value: "gradient-emerald",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-800",
    },
    {
      name: "Gradiente Teal",
      value: "gradient-teal",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-teal-400 via-teal-600 to-teal-800",
    },
    {
      name: "Gradiente Cyan",
      value: "gradient-cyan",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-cyan-400 via-cyan-600 to-cyan-800",
    },
    {
      name: "Gradiente Sky",
      value: "gradient-sky",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-sky-400 via-sky-600 to-sky-800",
    },
    {
      name: "Gradiente Blue",
      value: "gradient-blue-auto",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800",
    },
    {
      name: "Gradiente Indigo",
      value: "gradient-indigo",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-800",
    },
    {
      name: "Gradiente Violet",
      value: "gradient-violet",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-violet-400 via-violet-600 to-violet-800",
    },
    {
      name: "Gradiente Purple",
      value: "gradient-purple",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800",
    },
    {
      name: "Gradiente Fuchsia",
      value: "gradient-fuchsia",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-fuchsia-400 via-fuchsia-600 to-fuchsia-800",
    },
    {
      name: "Gradiente Pink",
      value: "gradient-pink",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-pink-400 via-pink-600 to-pink-800",
    },
    {
      name: "Gradiente Rose",
      value: "gradient-rose",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-rose-400 via-rose-600 to-rose-800",
    },
    {
      name: "Gradiente Slate",
      value: "gradient-slate",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-slate-400 via-slate-600 to-slate-800",
    },
    {
      name: "Gradiente Gray",
      value: "gradient-gray",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-gray-400 via-gray-600 to-gray-800",
    },
    {
      name: "Gradiente Zinc",
      value: "gradient-zinc",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-zinc-400 via-zinc-600 to-zinc-800",
    },
    {
      name: "Gradiente Neutral",
      value: "gradient-neutral",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-neutral-400 via-neutral-600 to-neutral-800",
    },
    {
      name: "Gradiente Stone",
      value: "gradient-stone",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-stone-400 via-stone-600 to-stone-800",
    },
  ]

  // Gradientes para botones
  const buttonGradients = [
    {
      name: "Gradiente Rojo",
      value: "gradient-red",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-red-400 via-red-500 to-red-600",
      hoverClass: "hover:from-red-500 hover:via-red-600 hover:to-red-700",
      shadowClass: "shadow-lg shadow-red-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-red-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Naranja",
      value: "gradient-orange",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600",
      hoverClass: "hover:from-orange-500 hover:via-orange-600 hover:to-orange-700",
      shadowClass: "shadow-lg shadow-orange-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-orange-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Ámbar",
      value: "gradient-amber",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600",
      hoverClass: "hover:from-amber-500 hover:via-amber-600 hover:to-amber-700",
      shadowClass: "shadow-lg shadow-amber-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-amber-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Amarillo",
      value: "gradient-yellow",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600",
      hoverClass: "hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700",
      shadowClass: "shadow-lg shadow-yellow-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-yellow-300",
      textColor: "text-gray-900",
    },
    {
      name: "Gradiente Lima",
      value: "gradient-lime",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600",
      hoverClass: "hover:from-lime-500 hover:via-lime-600 hover:to-lime-700",
      shadowClass: "shadow-lg shadow-lime-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-lime-300",
      textColor: "text-gray-900",
    },
    {
      name: "Gradiente Verde",
      value: "gradient-green",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-green-400 via-green-500 to-green-600",
      hoverClass: "hover:from-green-500 hover:via-green-600 hover:to-green-700",
      shadowClass: "shadow-lg shadow-green-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-green-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Esmeralda",
      value: "gradient-emerald",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600",
      hoverClass: "hover:from-emerald-500 hover:via-emerald-600 hover:to-emerald-700",
      shadowClass: "shadow-lg shadow-emerald-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-emerald-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Verde Azulado",
      value: "gradient-teal",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600",
      hoverClass: "hover:from-teal-500 hover:via-teal-600 hover:to-teal-700",
      shadowClass: "shadow-lg shadow-teal-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-teal-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Cian",
      value: "gradient-cyan",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600",
      hoverClass: "hover:from-cyan-500 hover:via-cyan-600 hover:to-cyan-700",
      shadowClass: "shadow-lg shadow-cyan-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-cyan-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Celeste",
      value: "gradient-sky",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600",
      hoverClass: "hover:from-sky-500 hover:via-sky-600 hover:to-sky-700",
      shadowClass: "shadow-lg shadow-sky-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-sky-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Azul",
      value: "gradient-blue",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600",
      hoverClass: "hover:from-blue-500 hover:via-blue-600 hover:to-blue-700",
      shadowClass: "shadow-lg shadow-blue-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-blue-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Índigo",
      value: "gradient-indigo",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600",
      hoverClass: "hover:from-indigo-500 hover:via-indigo-600 hover:to-indigo-700",
      shadowClass: "shadow-lg shadow-indigo-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-indigo-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Violeta",
      value: "gradient-violet",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600",
      hoverClass: "hover:from-violet-500 hover:via-violet-600 hover:to-violet-700",
      shadowClass: "shadow-lg shadow-violet-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-violet-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Púrpura",
      value: "gradient-purple",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600",
      hoverClass: "hover:from-purple-500 hover:via-purple-600 hover:to-purple-700",
      shadowClass: "shadow-lg shadow-purple-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-purple-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Fucsia",
      value: "gradient-fuchsia",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-fuchsia-400 via-fuchsia-500 to-fuchsia-600",
      hoverClass: "hover:from-fuchsia-500 hover:via-fuchsia-600 hover:to-fuchsia-700",
      shadowClass: "shadow-lg shadow-fuchsia-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-fuchsia-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Rosa",
      value: "gradient-pink",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600",
      hoverClass: "hover:from-pink-500 hover:via-pink-600 hover:to-pink-700",
      shadowClass: "shadow-lg shadow-pink-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-pink-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Rosado",
      value: "gradient-rose",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600",
      hoverClass: "hover:from-rose-500 hover:via-rose-600 hover:to-rose-700",
      shadowClass: "shadow-lg shadow-rose-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-rose-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Pizarra",
      value: "gradient-slate",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600",
      hoverClass: "hover:from-slate-500 hover:via-slate-600 hover:to-slate-700",
      shadowClass: "shadow-lg shadow-slate-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-slate-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Zinc",
      value: "gradient-zinc",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-zinc-400 via-zinc-500 to-zinc-600",
      hoverClass: "hover:from-zinc-500 hover:via-zinc-600 hover:to-zinc-700",
      shadowClass: "shadow-lg shadow-zinc-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-zinc-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Gris",
      value: "gradient-gray",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600",
      hoverClass: "hover:from-gray-500 hover:via-gray-600 hover:to-gray-700",
      shadowClass: "shadow-lg shadow-gray-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-gray-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Neutral",
      value: "gradient-neutral",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-neutral-400 via-neutral-500 to-neutral-600",
      hoverClass: "hover:from-neutral-500 hover:via-neutral-600 hover:to-neutral-700",
      shadowClass: "shadow-lg shadow-neutral-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-neutral-300",
      textColor: "text-white",
    },
    {
      name: "Gradiente Piedra",
      value: "gradient-stone",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-stone-400 via-stone-500 to-stone-600",
      hoverClass: "hover:from-stone-500 hover:via-stone-600 hover:to-stone-700",
      shadowClass: "shadow-lg shadow-stone-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-stone-300",
      textColor: "text-white",
    },
    // Gradientes combinados modernos
    {
      name: "Púrpura a Azul",
      value: "gradient-purple-blue",
      isGradient: true,
      gradientClass: "bg-gradient-to-br from-purple-600 to-blue-500",
      hoverClass: "hover:from-purple-700 hover:to-blue-600",
      shadowClass: "shadow-lg shadow-blue-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-blue-300",
      textColor: "text-white",
    },
    {
      name: "Cian a Azul",
      value: "gradient-cyan-blue",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-cyan-500 to-blue-500",
      hoverClass: "hover:from-cyan-600 hover:to-blue-600",
      shadowClass: "shadow-lg shadow-blue-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-cyan-300",
      textColor: "text-white",
    },
    {
      name: "Verde a Azul",
      value: "gradient-green-blue",
      isGradient: true,
      gradientClass: "bg-gradient-to-br from-green-400 to-blue-600",
      hoverClass: "hover:from-green-500 hover:to-blue-700",
      shadowClass: "shadow-lg shadow-blue-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-green-200",
      textColor: "text-white",
    },
    {
      name: "Púrpura a Rosa",
      value: "gradient-purple-pink",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-purple-500 to-pink-500",
      hoverClass: "hover:from-purple-600 hover:to-pink-600",
      shadowClass: "shadow-lg shadow-pink-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-purple-200",
      textColor: "text-white",
    },
    {
      name: "Rosa a Naranja",
      value: "gradient-pink-orange",
      isGradient: true,
      gradientClass: "bg-gradient-to-br from-pink-500 to-orange-400",
      hoverClass: "hover:from-pink-600 hover:to-orange-500",
      shadowClass: "shadow-lg shadow-orange-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-pink-200",
      textColor: "text-white",
    },
    {
      name: "Índigo a Púrpura",
      value: "gradient-indigo-purple",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-indigo-500 to-purple-500",
      hoverClass: "hover:from-indigo-600 hover:to-purple-600",
      shadowClass: "shadow-lg shadow-purple-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-indigo-200",
      textColor: "text-white",
    },
    {
      name: "Verde a Cian",
      value: "gradient-green-cyan",
      isGradient: true,
      gradientClass: "bg-gradient-to-br from-green-500 to-cyan-400",
      hoverClass: "hover:from-green-600 hover:to-cyan-500",
      shadowClass: "shadow-lg shadow-cyan-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-green-200",
      textColor: "text-white",
    },
    {
      name: "Rosa a Fucsia",
      value: "gradient-pink-fuchsia",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-pink-500 to-fuchsia-500",
      hoverClass: "hover:from-pink-600 hover:to-fuchsia-600",
      shadowClass: "shadow-lg shadow-fuchsia-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-pink-200",
      textColor: "text-white",
    },
    {
      name: "Ámbar a Naranja",
      value: "gradient-amber-orange",
      isGradient: true,
      gradientClass: "bg-gradient-to-br from-amber-500 to-orange-500",
      hoverClass: "hover:from-amber-600 hover:to-orange-600",
      shadowClass: "shadow-lg shadow-orange-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-amber-200",
      textColor: "text-white",
    },
    {
      name: "Verde a Esmeralda",
      value: "gradient-green-emerald",
      isGradient: true,
      gradientClass: "bg-gradient-to-r from-green-500 to-emerald-500",
      hoverClass: "hover:from-green-600 hover:to-emerald-600",
      shadowClass: "shadow-lg shadow-emerald-500/50",
      focusClass: "focus:ring-4 focus:outline-none focus:ring-green-200",
      textColor: "text-white",
    },
  ]

  // Colores de Tailwind CSS organizados
  const tailwindColors = {
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
    orange: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
    },
    amber: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
    },
    yellow: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
    },
    lime: {
      50: "#f7fee7",
      100: "#ecfccb",
      200: "#d9f99d",
      300: "#bef264",
      400: "#a3e635",
      500: "#84cc16",
      600: "#65a30d",
      700: "#4d7c0f",
      800: "#365314",
      900: "#1a2e05",
    },
    green: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
    emerald: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
    },
    teal: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
    },
    cyan: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63",
    },
    sky: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
    },
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    indigo: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },
    violet: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },
    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
    },
    fuchsia: {
      50: "#fdf4ff",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#d946ef",
      600: "#c026d3",
      700: "#a21caf",
      800: "#86198f",
      900: "#701a75",
    },
    pink: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899",
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843",
    },
    rose: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
    },
    slate: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
    zinc: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    stone: {
      50: "#fafaf9",
      100: "#f5f5f4",
      200: "#e7e5e4",
      300: "#d6d3d1",
      400: "#a8a29e",
      500: "#78716c",
      600: "#57534e",
      700: "#44403c",
      800: "#292524",
      900: "#1c1917",
    },
  }

  // Colores para fondos (50-100)
  const backgroundColors = Object.fromEntries(
    Object.entries(tailwindColors).map(([colorName, shades]) => [
      colorName,
      {
        50: shades[50],
        100: shades[100],
      },
    ]),
  )

  // Colores para títulos, párrafos, botones e iconos (400-900)
  const contentColors = Object.fromEntries(
    Object.entries(tailwindColors).map(([colorName, shades]) => [
      colorName,
      {
        400: shades[400],
        500: shades[500],
        600: shades[600],
        700: shades[700],
        800: shades[800],
        900: shades[900],
      },
    ]),
  )

  const handleColorChange = (colorType: keyof typeof colors, newColor: string) => {
    setColors((prev) => ({
      ...prev,
      [colorType]: newColor,
    }))
  }

  const handleTitleChange = (option: any) => {
    if (option.isGradient) {
      setTitleStyle({
        isGradient: true,
        gradientClass: option.gradientClass,
        value: option.value,
      })
    } else {
      setTitleStyle({
        isGradient: false,
        gradientClass: "",
        value: option,
      })
      setColors((prev) => ({ ...prev, titles: option }))
    }
  }

  const handleButtonChange = (option: any) => {
    if (option.isGradient) {
      setButtonStyle({
        isGradient: true,
        gradientClass: option.gradientClass,
        hoverClass: option.hoverClass,
        shadowClass: option.shadowClass,
        focusClass: option.focusClass,
        textColor: option.textColor,
        value: option.value,
      })
    } else {
      setButtonStyle({
        isGradient: false,
        gradientClass: "",
        hoverClass: "",
        shadowClass: "",
        focusClass: "",
        textColor: "text-white",
        value: option,
      })
      setColors((prev) => ({ ...prev, buttons: option }))
    }
  }

  const colorLabels = {
    titles: { label: "Títulos", description: "Color para encabezados y títulos principales" },
    paragraphs: { label: "Párrafos", description: "Color para texto de contenido y descripciones" },
    buttons: { label: "Botones", description: "Color principal para botones y elementos interactivos" },
    icons: { label: "Iconos", description: "Color para iconografía y elementos gráficos" },
    general: { label: "Color de fondo", description: "Color de fondo principal de la interfaz" },
  }

  const ColorPicker = ({
    value,
    onChange,
    label,
    colorType,
  }: { value: string; onChange: (color: string) => void; label: string; colorType: string }) => {
    // Determinar qué colores mostrar según el tipo
    let colorsToShow = tailwindColors
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = React.useRef<HTMLDivElement>(null)
    
    // Cerrar el dropdown cuando se hace clic fuera
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])

    if (colorType === "general") {
      // Color de fondo: solo 50-100
      colorsToShow = backgroundColors as typeof tailwindColors
    } else if (["titles", "paragraphs", "buttons", "icons"].includes(colorType)) {
      // Títulos, párrafos, botones e iconos: 400-900
      colorsToShow = contentColors as typeof tailwindColors
    }

    return (
      <div className="flex items-center justify-between" ref={dropdownRef}>
        
        <div className="flex items-center space-x-3">
          
          {/* Color selector dropdown */}
          <div className="relative">
            <div 
              className="flex items-center border border-gray-200 rounded-lg px-3 py-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="h-5 w-5" 
                  style={{ backgroundColor: value }}
                />
                <span className="text-sm font-medium">{value}</span>
              </div>
              <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </div>
            
            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-auto">
                <div className="p-3">
                  <h4 className="text-sm font-medium text-center mb-2">Seleccionar color para {colorLabels[colorType as keyof typeof colorLabels]?.label.toLowerCase()}</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Colores sólidos</span>
                    </div>
                    
                    {Object.entries(colorsToShow).map(([colorName, shades]) => (
                      <div key={colorName} className="space-y-1">
                        <div className="mb-1">
                          <span className="text-sm font-medium capitalize">{colorName}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(shades).map(([shade, hexColor]) => (
                            <button
                              key={`${colorName}-${shade}`}
                              type="button"
                              className={`h-8 w-8 rounded ${value === hexColor ? 'ring-2 ring-offset-1 ring-blue-500' : ''} flex items-center justify-center`}
                              style={{ backgroundColor: hexColor }}
                              onClick={() => {
                                onChange(hexColor)
                                setIsOpen(false)
                              }}
                            >
                              {value === hexColor && <Check className="h-4 w-4 text-white" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  

  const buttonStyles = [
    { id: "rounded", name: "Redondeado", preview: "rounded-lg" },
    { id: "sharp", name: "Angular", preview: "rounded-none" },
    { id: "pill", name: "Píldora", preview: "rounded-full" },
    { id: "subtle", name: "Sutil", preview: "rounded-md" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="mx-auto max-w-2xl">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">2 - Personalización del diseño</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Personaliza el estilo de tu plataforma
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Elige los elementos visuales que mejor representen tu marca
              </p>

              {/* Progress */}
              <div className="mt-4 flex items-center gap-2">
                <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-600">45%</span>
              </div>
            </div>

            <div className="space-y-8">
              {/* Color Palette Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-gray-600" />
                  <Label className="text-base font-medium">Paleta de colores personalizada</Label>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <div className="space-y-4 sm:space-y-6">
                    {Object.entries(colorLabels).map(([key, info]) => (
                      <div
                        key={key}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0"
                      >
                        <div className="flex-1">
                          <Label className="font-medium text-gray-900">{info.label}</Label>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">{info.description}</p>
                        </div>
                        <div className="flex items-center gap-3 justify-end">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border-2 border-gray-200 shadow-sm">
                            {key === "buttons" && buttonStyle.isGradient ? (
                              <div className={`w-full h-full rounded-lg ${buttonStyle.gradientClass}`} />
                            ) : key === "titles" && titleStyle.isGradient ? (
                              <div className={`w-full h-full rounded-lg ${titleStyle.gradientClass}`} />
                            ) : (
                              <div
                                className="w-full h-full rounded-lg"
                                style={{ backgroundColor: colors[key as keyof typeof colors] }}
                              />
                            )}
                          </div>
                          <ColorPicker
                            value={
                              key === "titles"
                                ? titleStyle.value
                                : key === "buttons"
                                  ? buttonStyle.value
                                  : colors[key as keyof typeof colors]
                            }
                            onChange={(color) => {
                              if (key === "buttons") {
                                handleButtonChange(color)
                              } else {
                                handleColorChange(key as keyof typeof colors, color)
                              }
                            }}
                            label={info.label.toLowerCase()}
                            colorType={key}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Color Preview */}
                  <div
                    className="mt-6 p-4 rounded-lg border border-gray-200"
                    style={{ backgroundColor: colors.general }}
                  >
                    {titleStyle.isGradient ? (
                      <h4
                        className={`mb-2 ${fontStyles.titleClass} ${titleStyle.gradientClass} bg-clip-text text-transparent`}
                      >
                        Vista previa de colores
                      </h4>
                    ) : (
                      <h4 className={`mb-2 ${fontStyles.titleClass}`} style={{ color: colors.titles }}>
                        Vista previa de colores
                      </h4>
                    )}
                    <p className={`mb-3 ${fontStyles.paragraphClass}`} style={{ color: colors.paragraphs }}>
                      Este es un ejemplo de cómo se verá el texto con los colores y tipografías seleccionadas. La
                      combinación de fuentes crea una jerarquía visual clara y profesional.
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          buttonStyle.isGradient
                            ? `${buttonStyle.gradientClass} ${buttonStyle.hoverClass} ${buttonStyle.shadowClass} ${buttonStyle.focusClass} ${buttonStyle.textColor}`
                            : "text-white"
                        }`}
                        style={buttonStyle.isGradient ? {} : { backgroundColor: colors.buttons }}
                      >
                        Botón ejemplo
                      </button>
                      <Sparkles className="h-5 w-5" style={{ color: colors.icons }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Font Combination Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Type className="h-5 w-5 text-gray-600" />
                  <Label className="text-base font-medium">Combinación de tipografías</Label>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Selecciona la combinación perfecta de fuentes para títulos y párrafos
                </p>
                <RadioGroup
                  value={selectedFontCombination}
                  onValueChange={(value) => {
                    setSelectedFontCombination(value)
                    handleFontCombinationChange(value)
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fontCombinations.map((combination) => (
                      <div key={combination.id} className="relative">
                        <RadioGroupItem value={combination.id} id={combination.id} className="sr-only" />
                        <Label
                          htmlFor={combination.id}
                          className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedFontCombination === combination.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-8 mb-3">
                            <div className="text-center">
                              <div
                                className={`text-3xl mb-2 ${combination.titleFont.class.replace("text-4xl", "text-3xl")}`}
                              >
                                Aa
                              </div>
                              <div className="text-sm font-medium text-gray-700">{combination.titleFont.name}</div>
                              <div className="text-xs text-gray-500">Títulos</div>
                            </div>
                            <div className="text-center">
                              <div
                                className={`text-3xl mb-2 ${combination.paragraphFont.class.replace("text-base", "text-3xl").replace("font-normal", "font-light")}`}
                              >
                                Aa
                              </div>
                              <div className="text-sm font-medium text-gray-700">{combination.paragraphFont.name}</div>
                              <div className="text-xs text-gray-500">Párrafos</div>
                            </div>
                          </div>
                          <div className="text-center">
                            <span className="font-medium text-sm text-gray-900">{combination.name}</span>
                          </div>
                          {selectedFontCombination === combination.id && (
                            <Check className="h-5 w-5 text-blue-600 mt-2" />
                          )}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {/* Vista previa de tipografías */}
                {selectedFontCombination && (
                  <div className="mt-6 border border-gray-200 rounded-lg p-6 bg-white">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Vista previa de tipografías</h4>
                    <div className="p-6 rounded-lg border border-gray-200" style={{ backgroundColor: colors.general }}>
                      {/* Título principal */}
                      {titleStyle.isGradient ? (
                        <h1
                          className={`mb-4 ${fontStyles.titleClass} ${titleStyle.gradientClass} bg-clip-text text-transparent`}
                        >
                          Bienvenido a tu plataforma
                        </h1>
                      ) : (
                        <h1 className={`mb-4 ${fontStyles.titleClass}`} style={{ color: colors.titles }}>
                          Bienvenido a tu plataforma
                        </h1>
                      )}

                      {/* Párrafo */}
                      <p
                        className={`${fontStyles.paragraphClass.replace("text-base", "text-xl")}`}
                        style={{ color: colors.paragraphs }}
                      >
                        Diseño personalizado para tu marca
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Button Style */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MousePointer className="h-5 w-5 text-gray-600" />
                  <Label className="text-base font-medium">Estilo de botones</Label>
                </div>
                <RadioGroup value={selectedButtonStyle} onValueChange={setSelectedButtonStyle}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {buttonStyles.map((style) => (
                      <div key={style.id} className="relative">
                        <RadioGroupItem value={style.id} id={style.id} className="sr-only" />
                        <Label
                          htmlFor={style.id}
                          className={`flex flex-col items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedButtonStyle === style.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div
                            className={`text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm mb-2 ${style.preview}`}
                            style={{ backgroundColor: colors.buttons }}
                          >
                            Botón
                          </div>
                          <span className="text-xs sm:text-sm font-medium">{style.name}</span>
                          {selectedButtonStyle === style.id && (
                            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 mt-1" />
                          )}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Visual Effects */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-gray-600" />
                  <Label className="text-base font-medium">Efectos visuales</Label>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 rounded-lg gap-3 sm:gap-0">
                    <div>
                      <Label htmlFor="borders" className="font-medium text-sm sm:text-base">
                        Bordes definidos
                      </Label>
                      <p className="text-xs sm:text-sm text-gray-600">Añade bordes visibles a los elementos</p>
                    </div>
                    <Switch id="borders" checked={bordersEnabled} onCheckedChange={setBordersEnabled} />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-gray-200 rounded-lg gap-3 sm:gap-0">
                    <div>
                      <Label htmlFor="shadows" className="font-medium text-sm sm:text-base">
                        Sombras (Box Shadow)
                      </Label>
                      <p className="text-xs sm:text-sm text-gray-600">Añade profundidad con sombras suaves</p>
                    </div>
                    <Switch id="shadows" checked={shadowsEnabled} onCheckedChange={setShadowsEnabled} />
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">¿Por qué personalizar tu diseño?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Identidad visual única y profesional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Mejor experiencia de usuario personalizada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Coherencia visual en toda la plataforma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Optimizado para conversión y engagement</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-8">
              <Button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 sm:py-3 text-sm sm:text-base font-medium"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Continuar personalización
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Stage2Settings

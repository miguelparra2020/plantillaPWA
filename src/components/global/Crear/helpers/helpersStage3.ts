export const colorOptionsButtons = [
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

  export const bgShadeOptionsButtons = [
    { name: "500", value: 500 },
    { name: "600", value: 600 },
    { name: "700", value: 700 },
  ]
  
  // Opciones de border radius
  export const roundedOptionsButtons = [
    { name: "None", value: "rounded-none" },
    { name: "Small", value: "rounded-sm" },
    { name: "Default", value: "rounded" },
    { name: "Medium", value: "rounded-md" },
    { name: "Large", value: "rounded-lg" },
    { name: "Extra Large", value: "rounded-xl" },
    { name: "2XL", value: "rounded-2xl" },
    { name: "3XL", value: "rounded-3xl" },
    { name: "Full", value: "rounded-full" },
  ]
  
  // Opciones de ancho de borde
  export const borderWidthOptionsButtons = [
    { name: "1px", value: "border" },
    { name: "2px", value: "border-2" },
    { name: "4px", value: "border-4" },
    { name: "8px", value: "border-8" },
  ]
  
  // Opciones de sombra
  export const shadowOptionsButtons = [
    { name: "None", value: "shadow-none" },
    { name: "Small", value: "shadow-sm" },
    { name: "Default", value: "shadow" },
    { name: "Medium", value: "shadow-md" },
    { name: "Large", value: "shadow-lg" },
    { name: "Extra Large", value: "shadow-xl" },
    { name: "2XL", value: "shadow-2xl" },
  ]

  export const colorClassMap = {
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

  export const hoverColorClassMap = {
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

  export const borderColorClassMap = {
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

  
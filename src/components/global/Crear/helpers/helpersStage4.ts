import { BusinessCategory } from "../interfaces/modelsStage4"

export const colorOptionsStage4 = [
  { value: 'red', name: 'Rojo', titleShade: 700, detailShade: 600 },
  { value: 'orange', name: 'Naranja', titleShade: 700, detailShade: 600 },
  { value: 'amber', name: 'Ámbar', titleShade: 700, detailShade: 600 },
  { value: 'yellow', name: 'Amarillo', titleShade: 700, detailShade: 600 },
  { value: 'lime', name: 'Lima', titleShade: 700, detailShade: 600 },
  { value: 'green', name: 'Verde', titleShade: 700, detailShade: 600 },
  { value: 'emerald', name: 'Esmeralda', titleShade: 700, detailShade: 600 },
  { value: 'teal', name: 'Verde azulado', titleShade: 700, detailShade: 600 },
  { value: 'cyan', name: 'Cian', titleShade: 700, detailShade: 600 },
  { value: 'sky', name: 'Celeste', titleShade: 700, detailShade: 600 },
  { value: 'blue', name: 'Azul', titleShade: 700, detailShade: 600 },
  { value: 'indigo', name: 'Índigo', titleShade: 700, detailShade: 600 },
  { value: 'violet', name: 'Violeta', titleShade: 700, detailShade: 600 },
  { value: 'purple', name: 'Morado', titleShade: 700, detailShade: 600 },
  { value: 'fuchsia', name: 'Fucsia', titleShade: 700, detailShade: 600 },
  { value: 'pink', name: 'Rosado', titleShade: 700, detailShade: 600 },
  { value: 'rose', name: 'Rosa', titleShade: 700, detailShade: 600 },
  { value: 'slate', name: 'Pizarra', titleShade: 700, detailShade: 600 },
  { value: 'zinc', name: 'Zinc', titleShade: 700, detailShade: 600 },
  { value: 'gray', name: 'Gris', titleShade: 700, detailShade: 600 },
  { value: 'neutral', name: 'Neutral', titleShade: 700, detailShade: 600 },
  { value: 'stone', name: 'Piedra', titleShade: 700, detailShade: 600 }
]

export const colorClassMapStage4 = {
  red: { 500: 'text-red-500', 600: 'text-red-600', 700: 'text-red-700' },
  orange: { 500: 'text-orange-500', 600: 'text-orange-600', 700: 'text-orange-700' },
  amber: { 500: 'text-amber-500', 600: 'text-amber-600', 700: 'text-amber-700' },
  yellow: { 500: 'text-yellow-500', 600: 'text-yellow-600', 700: 'text-yellow-700' },
  lime: { 500: 'text-lime-500', 600: 'text-lime-600', 700: 'text-lime-700' },
  green: { 500: 'text-green-500', 600: 'text-green-600', 700: 'text-green-700' },
  emerald: { 500: 'text-emerald-500', 600: 'text-emerald-600', 700: 'text-emerald-700' },
  teal: { 500: 'text-teal-500', 600: 'text-teal-600', 700: 'text-teal-700' },
  cyan: { 500: 'text-cyan-500', 600: 'text-cyan-600', 700: 'text-cyan-700' },
  sky: { 500: 'text-sky-500', 600: 'text-sky-600', 700: 'text-sky-700' },
  blue: { 500: 'text-blue-500', 600: 'text-blue-600', 700: 'text-blue-700' },
  indigo: { 500: 'text-indigo-500', 600: 'text-indigo-600', 700: 'text-indigo-700' },
  violet: { 500: 'text-violet-500', 600: 'text-violet-600', 700: 'text-violet-700' },
  purple: { 500: 'text-purple-500', 600: 'text-purple-600', 700: 'text-purple-700' },
  fuchsia: { 500: 'text-fuchsia-500', 600: 'text-fuchsia-600', 700: 'text-fuchsia-700' },
  pink: { 500: 'text-pink-500', 600: 'text-pink-600', 700: 'text-pink-700' },
  rose: { 500: 'text-rose-500', 600: 'text-rose-600', 700: 'text-rose-700' },
  slate: { 500: 'text-slate-500', 600: 'text-slate-600', 700: 'text-slate-700' },
  zinc: { 500: 'text-zinc-500', 600: 'text-zinc-600', 700: 'text-zinc-700' },
  gray: { 500: 'text-gray-500', 600: 'text-gray-600', 700: 'text-gray-700' },
  neutral: { 500: 'text-neutral-500', 600: 'text-neutral-600', 700: 'text-neutral-700' },
  stone: { 500: 'text-stone-500', 600: 'text-stone-600', 700: 'text-stone-700' }
}

export const businessCategories: BusinessCategory[] = [
  {
    id: '1',
    title: '🛒 Tienda de productos',
    description: 'Venta de productos físicos o digitales.',
    includes: ['Productos físicos o digitales', 'Variaciones de producto', 'Carrito de compras, envíos'],
    examples: ['Tiendas de ropa', 'Supermercados', 'Farmacias', 'Librerías', 'etc...']
  },
  {
    id: '2',
    title: '🗓️ Servicios con agendamiento',
    description: 'Servicios que requieren cita o reserva.',
    includes: ['Calendario de disponibilidad', 'Gestión de citas o turnos', 'Recordatorios automáticos'],
    examples: ['Barberías', 'Clínicas', 'Consultorías', 'etc...']
  },
  {
    id: '3',
    title: '🧑‍🏫 Servicios sin agendamiento',
    description: 'Servicios entregados sin necesidad de cita.',
    includes: ['Formulario de contacto', 'Entrega por correo o digital', 'Sin calendario'],
    examples: ['Diseño gráfico', 'Educación online', 'Redacción', 'etc...']
  },
  {
    id: '4',
    title: '🏠 Alquiler o reservas',
    description: 'Alquiler de cosas o gestión de eventos.',
    includes: ['Calendario de disponibilidad', 'Precio por día o periodo', 'Condiciones de uso'],
    examples: ['Alquiler de autos', 'Casas', 'Eventos', 'etc...']
  },
  {
    id: '5',
    title: '🛰️ Contenido por suscripción',
    description: 'Acceso recurrente a contenido exclusivo.',
    includes: ['Pagos mensuales o anuales', 'Niveles de membresía', 'Gestión de acceso privado'],
    examples: ['Cursos premium', 'Newsletters', 'Comunidades privadas', 'etc...']
  }
]

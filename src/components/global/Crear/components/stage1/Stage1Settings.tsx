import React from 'react'
import { Store, Globe, FileText } from 'lucide-react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useCrearContext } from '../../../Context/CrearContext'

export const Stage1Settings = () => {
  const { settings, setSettings } = useCrearContext()

  const handleSettingsChange = (key: keyof typeof settings.Stage1, value: string) => {
    setSettings((prev) => ({
      ...prev,
      Stage1: {
        ...prev.Stage1,
        [key]: value
      }
    }))
  }

  return (
    <div>
      <form className='flex flex-col gap-4 flex-1 p-4 justify-between'>
        <div className='space-y-4'>
          {/* Nombre de la empresa */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Store className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>Nombre de su comercio eletrónico o proyecto</span>
            </div>
            <Input
              type='text'
              placeholder='Mi comercio'
              value={settings.Stage1.storeName}
              onChange={(e) => handleSettingsChange('storeName', e.target.value)}
              className='w-full bg-zinc-100  text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 '
            />
          </div>
          {/* Descripción */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <FileText className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>Descripción de su actividad económica</span>
            </div>
            <Textarea
              placeholder='Somos una empresa dedicada al comercio electrónico de productos tecnológicos, etc...'
              value={settings.Stage1.description}
              onChange={(e) => handleSettingsChange('description', e.target.value)}
              className='w-full bg-zinc-100  text-sm text-zinc-900  placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900  min-h-[100px]'
            />
          </div>
          {/* Idioma */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Globe className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>Idioma de su plataforma</span>
            </div>
            <Select value={settings.Stage1.language} onValueChange={(value) => handleSettingsChange('language', value)}>
              <SelectTrigger className='w-full h-10 bg-zinc-100  border-zinc-200 rounded-xl'>
                <SelectValue placeholder='Seleccione un idioma' />
              </SelectTrigger>
              <SelectContent className='absolute z-[3000] mt-2 bg-white'>
                <SelectItem value='español'>🇪🇸 Español</SelectItem>
                <SelectItem value='inglés'>🇺🇲 Inglés</SelectItem>
                <SelectItem value='francés'>🇫🇷 Francés</SelectItem>
                <SelectItem value='portugués'>🇵🇹 Portugués</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className='space-y-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50'>
          <div className='text-sm text-zinc-700 dark:text-zinc-300'>
            <p className='font-medium mb-2'>¿Por qué crear su ecommerce con nosotros?</p>
            <ul className='space-y-1 text-xs text-zinc-500 dark:text-zinc-400'>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
                Configuración rápida y sencilla
              </li>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
                Diseño profesional y personalizable
              </li>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
                Costos bajos y transparentes
              </li>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
                Optimizado para dispositivos móviles, enfocado en SEO y performance
              </li>
            </ul>
          </div>
        </div>
        
      </form>
    </div>
  )
}
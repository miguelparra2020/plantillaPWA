import React, { useState, useEffect, useMemo } from 'react'
import { Store, Globe, FileText, Image, Upload } from 'lucide-react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useStore } from '@nanostores/react'
import { languajePage } from 'src/stores/languajePage'
import { generalConfig } from "@util/generalConfig"
import { crearStore, type InfoStage1 } from 'src/stores/crearStore'
import useSuggestionListActivitiesEs from './useSuggestionListActivitiesEs'
import { ContenedorNotificaciones } from '@globals'
import { toast } from 'react-toastify'

interface ResizedIcons {
  icon192: string;
  icon512: string;
}

export const Stage1Settings = () => {
  const { data: dataLanguaje} = useStore(languajePage)
  const store = useStore(crearStore)
  const [localSettings, setLocalSettings] = useState<InfoStage1>(store.infoStage1 || {
    nombreComercio: '',
    descripcionActividad: '',
    idiomaPlataforma: '',
    iconoPlataforma: '',
    icon192: '',
    icon512: ''
  })

  const [previews, setPreviews] = useState<{
    original: string | null;
    icon192: string | null;
    icon512: string | null;
  }>({
    original: null,
    icon192: null,
    icon512: null
  })

  const [descripcionSuggestions, setDescripcionSuggestions] = useState<string[]>([])
  const suggestionsList = useSuggestionListActivitiesEs(localSettings.descripcionActividad)
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    setDescripcionSuggestions(suggestionsList)
  }, [suggestionsList])

  const handleSettingsChange = (key: keyof InfoStage1, value: string) => {
    const updatedSettings = { ...localSettings, [key]: value }
    setLocalSettings(updatedSettings)

    setTimeout(() => {
      crearStore.set({ ...crearStore.get(), infoStage1: updatedSettings })
    }, 300)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    handleSettingsChange('descripcionActividad', newValue)
    
    if (newValue.length > 2) {
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const resizeImage = (imgSrc: string, width: number, height: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement('img')
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        // Dibujar la imagen redimensionada
        ctx.drawImage(img, 0, 0, width, height)
        
        // Convertir a PNG
        const resizedImgSrc = canvas.toDataURL('image/png')
        resolve(resizedImgSrc)
      }
      img.onerror = () => {
        reject(new Error('Error loading image'))
      }
      img.src = imgSrc
    })
  }

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'image/png') {
        toast.error(dataLanguaje.languajeChoose === "/es/" ? "Solo se permiten archivos PNG" : 
              dataLanguaje.languajeChoose === "/en/" ? "Only PNG files are allowed" : 
              dataLanguaje.languajeChoose === "/pt/" ? "Apenas arquivos PNG são permitidos" : 
              "Seuls les fichiers PNG sont autorisés")
        e.target.value = '' 
        return
      }

      try {
        // Mostrar mensaje de procesamiento
        toast.info(dataLanguaje.languajeChoose === "/es/" ? "Procesando imagen..." : 
                  dataLanguaje.languajeChoose === "/en/" ? "Processing image..." : 
                  dataLanguaje.languajeChoose === "/pt/" ? "Processando imagem..." : 
                  "Traitement de l'image...")

        const reader = new FileReader()
        reader.onloadend = async () => {
          const originalBase64 = reader.result as string
          
          try {
            // Redimensionar la imagen a 192x192 y 512x512
            const icon192 = await resizeImage(originalBase64, 192, 192)
            const icon512 = await resizeImage(originalBase64, 512, 512)
            
            // Actualizar el store con las tres versiones
            handleSettingsChange('iconoPlataforma', originalBase64)
            handleSettingsChange('icon192', icon192)
            handleSettingsChange('icon512', icon512)
            
            // Mostrar vista previa de todas las imágenes
            setPreviews({
              original: originalBase64,
              icon192: icon192,
              icon512: icon512
            })
            
            // Mensaje de éxito
            toast.success(dataLanguaje.languajeChoose === "/es/" ? "Imagen procesada correctamente" : 
                        dataLanguaje.languajeChoose === "/en/" ? "Image processed successfully" : 
                        dataLanguaje.languajeChoose === "/pt/" ? "Imagem processada com sucesso" : 
                        "Image traitée avec succès")
          } catch (error) {
            console.error('Error resizing image:', error)
            toast.error(dataLanguaje.languajeChoose === "/es/" ? "Error al procesar la imagen" : 
                       dataLanguaje.languajeChoose === "/en/" ? "Error processing image" : 
                       dataLanguaje.languajeChoose === "/pt/" ? "Erro ao processar imagem" : 
                       "Erreur lors du traitement de l'image")
          }
        }
        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Error reading file:', error)
        toast.error(dataLanguaje.languajeChoose === "/es/" ? "Error al leer el archivo" : 
                   dataLanguaje.languajeChoose === "/en/" ? "Error reading file" : 
                   dataLanguaje.languajeChoose === "/pt/" ? "Erro ao ler o arquivo" : 
                   "Erreur lors de la lecture du fichier")
      }
    }
  }
  


  return (
    <div>
      <form className='flex flex-col gap-4 flex-1 p-4 justify-between'>
      <ContenedorNotificaciones/> 
        <div className='space-y-4'>
          {/* Nombre de la empresa */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Store className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>
                {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.nameEcommerceStage1:""}
                {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.nameEcommerceStage1:""}
                {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.nameEcommerceStage1:""}
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.nameEcommerceStage1:""}
                {!localSettings.nombreComercio && <span className="text-red-500 ml-1">*</span>}
              </span>
            </div>
            <Input
              type='text'
              placeholder={`${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.placeholderNameEcommerceStage1:""}${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.placeholderNameEcommerceStage1:""}${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.placeholderNameEcommerceStage1:""}${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.placeholderNameEcommerceStage1:""}`}
              value={localSettings.nombreComercio}
              onChange={(e) => handleSettingsChange('nombreComercio', e.target.value)}
              className='w-full bg-zinc-100  text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 '
            />
          </div>
          {/* Descripción */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <FileText className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>
                {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.activityEcommerceStage1:""}
                {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.activityEcommerceStage1:""}
                {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.activityEcommerceStage1:""}
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.activityEcommerceStage1:""}
                {!localSettings.descripcionActividad && <span className="text-red-500 ml-1">*</span>}
              </span>
            </div>
            <div className='relative'>
              <Textarea
                placeholder={`${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.placeholderActivityEcommerceStage1:""}${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.placeholderActivityEcommerceStage1:""}${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.placeholderActivityEcommerceStage1:""}${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.placeholderActivityEcommerceStage1:""}`}
                value={localSettings.descripcionActividad}
                onChange={handleDescriptionChange}
                onFocus={() => descripcionSuggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
                className='w-full bg-zinc-100 text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 min-h-[100px]'
              />
              {showSuggestions && descripcionSuggestions.length > 0 && (
                <div className='absolute z-[1000] w-full mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                  {descripcionSuggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      className='p-2 text-sm cursor-pointer hover:bg-zinc-100'
                      onClick={() => {
                        handleSettingsChange('descripcionActividad', suggestion)
                        setShowSuggestions(false)
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* Idioma */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Globe className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>
                {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.languagePageStage1:""}
                {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.languagePageStage1:""}
                {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.languagePageStage1:""}
                {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.languagePageStage1:""}
                {!localSettings.idiomaPlataforma && <span className="text-red-500 ml-1">*</span>}
              </span>
            </div>
            <Select value={localSettings.idiomaPlataforma} onValueChange={(value) => handleSettingsChange('idiomaPlataforma', value)}>
              <SelectTrigger className='w-full h-10 bg-zinc-100  border-zinc-200 rounded-xl'>
                <SelectValue placeholder={`${dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.placeholderLanguagePageStage1 :""}${dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.placeholderLanguagePageStage1:""}${dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.placeholderLanguagePageStage1:""}${dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.placeholderLanguagePageStage1:""}`} />
              </SelectTrigger>
              <SelectContent className='absolute z-[3000] mt-2 bg-white'>
                <SelectItem value='/es/'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.languageEsPageStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.languageEsPageStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.languageEsPageStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.languageEsPageStage1:""}
                </SelectItem>
                <SelectItem value='/en/'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.languageEnPageStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.languageEnPageStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.languageEnPageStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.languageEnPageStage1:""}
                </SelectItem>
                <SelectItem value='/pt/'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.languagePtPageStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.languagePtPageStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.languagePtPageStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.languagePtPageStage1:""}
                </SelectItem>
                <SelectItem value='/fr/'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.languageFrPageStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.languageFrPageStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.languageFrPageStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.languageFrPageStage1:""}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Icono de la plataforma */}
          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Image className='w-4 h-4 text-zinc-500' />
              <span className='text-sm text-zinc-500'>
                {dataLanguaje.languajeChoose === "/es/" ? "Icono de la plataforma":""}
                {dataLanguaje.languajeChoose === "/en/" ? "Platform icon":""}
                {dataLanguaje.languajeChoose === "/pt/" ? "Ícone da plataforma":""}
                {dataLanguaje.languajeChoose === "/fr/" ? "Icône de la plateforme":""}
              </span>
            </div>
            <div className='relative w-full'>
              <Input
                type='file'
                accept='image/png'
                onChange={handleIconUpload}
                className='w-full bg-zinc-100 text-sm text-zinc-900 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900'
              />
              <Upload className='absolute right-3 top-2 w-4 h-4 text-zinc-500' />
            </div>

            {previews.original && (
              <div className='mt-4'>
                <p className='text-xs font-medium text-zinc-500 mb-2'>
                  {dataLanguaje.languajeChoose === "/es/" ? "Vista previa de las imágenes":""}
                  {dataLanguaje.languajeChoose === "/en/" ? "Image previews":""}
                  {dataLanguaje.languajeChoose === "/pt/" ? "Visualização das imagens":""}
                  {dataLanguaje.languajeChoose === "/fr/" ? "Aperçu des images":""}
                </p>
                <div className='flex flex-wrap gap-4'>
                  <div className='flex flex-col items-center'>
                    <div className='rounded-md overflow-hidden border border-zinc-200 w-16 h-16'>
                      <img src={previews.original} alt="Original" className='w-full h-full object-cover' />
                    </div>
                    <span className='text-xs text-zinc-400 mt-1'>Original</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='rounded-md overflow-hidden border border-zinc-200'>
                      <img src={previews.icon192} alt="192x192" className='w-12 h-12' />
                    </div>
                    <span className='text-xs text-zinc-400 mt-1'>192x192</span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='rounded-md overflow-hidden border border-zinc-200'>
                      <img src={previews.icon512} alt="512x512" className='w-12 h-12' />
                    </div>
                    <span className='text-xs text-zinc-400 mt-1'>512x512</span>
                  </div>
                </div>
              </div>
            )}
            <p className='text-xs text-zinc-400'>
              {dataLanguaje.languajeChoose === "/es/" ? "Sube un icono para tu plataforma (solo formato PNG)":""}
              {dataLanguaje.languajeChoose === "/en/" ? "Upload an icon for your platform (PNG format only)":""}
              {dataLanguaje.languajeChoose === "/pt/" ? "Carregue um ícone para sua plataforma (apenas formato PNG)":""}
              {dataLanguaje.languajeChoose === "/fr/" ? "Téléchargez une icône pour votre plateforme (format PNG uniquement)":""}
            </p>
          </div>
        </div>
        {/* Preguntas por que elegirnos */}
        <div className='space-y-4 p-4 rounded-xl bg-zinc-50 '>
          <div className='text-sm text-zinc-700 '>
            <p className='font-medium mb-2'>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.proofQuestionStage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.proofQuestionStage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.proofQuestionStage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.proofQuestionStage1:""}
            </p>
            <ul className='space-y-1 text-xs text-zinc-500 '>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.proofItem1Stage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.proofItem1Stage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.proofItem1Stage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.proofItem1Stage1:""}
              </li>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.proofItem2Stage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.proofItem2Stage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.proofItem2Stage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.proofItem2Stage1:""}
              </li>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.proofItem3Stage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.proofItem3Stage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.proofItem3Stage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.proofItem3Stage1:""}
              </li>
              <li className='flex items-center gap-1'>
                <span className='w-1 h-1 bg-fuchsia-500 rounded-full'></span>
  {dataLanguaje.languajeChoose === "/es/" ? generalConfig.Create.stage1.es.proofItem4Stage1:""}
  {dataLanguaje.languajeChoose === "/en/" ? generalConfig.Create.stage1.en.proofItem4Stage1:""}
  {dataLanguaje.languajeChoose === "/pt/" ? generalConfig.Create.stage1.pt.proofItem4Stage1:""}
  {dataLanguaje.languajeChoose === "/fr/" ? generalConfig.Create.stage1.fr.proofItem4Stage1:""}
              </li>
            </ul>
          </div>
        </div>
        
      </form>
    </div>
  )
}
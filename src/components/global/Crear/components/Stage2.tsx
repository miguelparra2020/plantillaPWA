import React from "react"
import { useState } from "react"
import { Sparkles, Store, Globe, FileText } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import CardGeneral from "./CardGeneral"

interface EcommerceSettings {
    storeName: string
    description: string
    language: string
    theme: string
    colorScheme: string
}

interface StageProps {
  totalStages: number
  currentStage: number
}


const Stage2 : React.FC<StageProps> = ({ totalStages, currentStage }) => {

    const progressPorcent = (currentStage / totalStages) * 100

    const [showForm, setShowForm] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [settings, setSettings] = useState<EcommerceSettings>({
        storeName: "",
        description: "",
        language: "español",
        theme: "modern",
        colorScheme: "light",
    })
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setShowForm(false)
        setIsLoading(true)
        setError(null)
    
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 3000))
          setShowForm(false)
        } catch (err) {
          setError("Error al procesar su solicitud. Por favor intente nuevamente.")
        } finally {
          setIsLoading(false)
        }
      }
    
      const handleBackToSettings = () => {
        setShowForm(true)
        setError(null)
      }
    
      const handleSettingsChange = (key: keyof EcommerceSettings, value: string) => {
        setSettings((prev) => ({
          ...prev,
          [key]: value,
        }))
      }
    
      return (
        <>
          <CardGeneral 
            title={`${currentStage} - Bienvenido a la creación personalizada del comercio electrónico`} 
            subtitle={"Comienza tu viaje hacia el éxito digital en minutos"} 
            progress={progressPorcent} 
            children
            
          />
        </>
        // <div className="mt-4 group relative overflow-hidden w-[96%] max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] min-h-[600px] flex flex-col justify-between gap-2">
        //   <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
        //     <div className="flex items-center gap-3">
        //       <div>
        //         <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        //           Bienvenido a la creación personalizada del comercio eletrónico
        //         </h3>
        //         <p className="text-xs text-zinc-500 dark:text-zinc-400">
        //           Comienza tu viaje hacia el éxito digital en minutos
        //         </p>
        //       </div>
        //     </div>
        //   </div>
    
        //   <div className="flex-1 overflow-hidden flex flex-col">
    
        //     {showForm ? (
        //       <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1 p-4 justify-between">
        //         <div className="space-y-4">
        //           {/* Nombre de la empresa */}
        //           <div className="space-y-2">
        //             <div className="flex items-center gap-2">
        //               <Store className="w-4 h-4 text-zinc-500" />
        //               <span className="text-sm text-zinc-500">Nombre de su comercio eletrónico</span>
        //             </div>
        //             <Input
        //               type="text"
        //               placeholder="Mi comercio"
        //               value={settings.storeName}
        //               onChange={(e) => handleSettingsChange("storeName", e.target.value)}
        //               className="w-full bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 dark:focus-visible:border-zinc-100"
        //             />
        //           </div>
    
        //           {/* Descripción */}
        //           <div className="space-y-2">
        //             <div className="flex items-center gap-2">
        //               <FileText className="w-4 h-4 text-zinc-500" />
        //               <span className="text-sm text-zinc-500">Descripción de su actividad económica</span>
        //             </div>
        //             <Textarea
        //               placeholder="Somos una empresa dedicada al comercio electrónico de productos tecnológicos, etc..."
        //               value={settings.description}
        //               onChange={(e) => handleSettingsChange("description", e.target.value)}
        //               className="w-full bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 rounded-xl focus:outline-none focus-visible:ring-offset-0 focus-visible:ring-0 focus-visible:border-zinc-900 dark:focus-visible:border-zinc-100 min-h-[100px]"
        //             />
        //           </div>
    
        //           {/* Idioma */}
        //           <div className="space-y-2">
        //             <div className="flex items-center gap-2">
        //               <Globe className="w-4 h-4 text-zinc-500" />
        //               <span className="text-sm text-zinc-500">Idioma de la plataforma</span>
        //             </div>
        //             <Select value={settings.language} onValueChange={(value) => handleSettingsChange("language", value)}>
        //               <SelectTrigger className="w-full h-10 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-xl">
        //                 <SelectValue placeholder="Seleccione un idioma" />
        //               </SelectTrigger>
        //               <SelectContent>
        //                 <SelectItem value="español">Español</SelectItem>
        //                 <SelectItem value="inglés">Inglés</SelectItem>
        //                 <SelectItem value="francés">Francés</SelectItem>
        //                 <SelectItem value="portugués">Portugués</SelectItem>
        //               </SelectContent>
        //             </Select>
        //           </div>
        //         </div>
    
        //         {/* <div className="space-y-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
        //           <div className="text-sm text-zinc-700 dark:text-zinc-300">
        //             <p className="font-medium mb-2">¿Por qué crear su ecommerce con nosotros?</p>
        //             <ul className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
        //               <li className="flex items-center gap-1">
        //                 <span className="w-1 h-1 bg-fuchsia-500 rounded-full"></span>
        //                 Configuración rápida y sencilla
        //               </li>
        //               <li className="flex items-center gap-1">
        //                 <span className="w-1 h-1 bg-fuchsia-500 rounded-full"></span>
        //                 Diseño profesional y personalizable
        //               </li>
        //               <li className="flex items-center gap-1">
        //                 <span className="w-1 h-1 bg-fuchsia-500 rounded-full"></span>
        //                 Soporte técnico 24/7
        //               </li>
        //               <li className="flex items-center gap-1">
        //                 <span className="w-1 h-1 bg-fuchsia-500 rounded-full"></span>
        //                 Optimizado para dispositivos móviles
        //               </li>
        //             </ul>
        //           </div>
        //         </div> */}
    
        //         <button
        //           type="submit"
        //           className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-white text-sm font-medium rounded-xl transition-colors self-end"
        //         >
        //           <Sparkles className="w-4 h-4" />
        //           Empezar
        //         </button>
        //       </form>
        //     ) : (
        //       <div className="p-4 flex flex-col h-full">
        //         {isLoading ? (
        //           <div className="flex-1 flex items-center justify-center">
        //             <Card title="Creando su ecommerce" subtitle="Esto puede tomar unos segundos" progress={60}>
        //               <div className="relative w-12 h-12">
        //                 <div className="w-full h-full animate-spin text-fuchsia-500">
        //                   <svg
        //                     xmlns="http://www.w3.org/2000/svg"
        //                     width="48"
        //                     height="48"
        //                     viewBox="0 0 24 24"
        //                     fill="none"
        //                     stroke="currentColor"
        //                     strokeWidth="2"
        //                     strokeLinecap="round"
        //                     strokeLinejoin="round"
        //                   >
        //                     <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        //                   </svg>
        //                 </div>
        //                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-fuchsia-500/10 rounded-full animate-spin-slow"></div>
        //               </div>
        //             </Card>
        //           </div>
        //         ) : (
        //           <div className="flex flex-col h-full justify-between">
        //             <div className="flex-1 flex flex-col items-center justify-center gap-4 py-6">
        //               <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
        //                 <svg
        //                   xmlns="http://www.w3.org/2000/svg"
        //                   width="32"
        //                   height="32"
        //                   viewBox="0 0 24 24"
        //                   fill="none"
        //                   stroke="currentColor"
        //                   strokeWidth="2"
        //                   strokeLinecap="round"
        //                   strokeLinejoin="round"
        //                 >
        //                   <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        //                   <polyline points="22 4 12 14.01 9 11.01" />
        //                 </svg>
        //               </div>
        //               <div className="text-center">
        //                 <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">
        //                   ¡Ecommerce creado con éxito!
        //                 </h3>
        //                 <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
        //                   Su tienda online "{settings.storeName || "Mi comercio"}" ha sido configurada correctamente.
        //                 </p>
        //               </div>
        //             </div>
    
        //             <div className="space-y-4">
        //               <div className="p-3 space-y-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
        //                 <div className="flex justify-between text-sm">
        //                   <span className="text-zinc-500">Idioma</span>
        //                   <span className="text-zinc-900 dark:text-zinc-100">{settings.language}</span>
        //                 </div>
        //                 <div className="flex justify-between text-sm">
        //                   <span className="text-zinc-500">Estado</span>
        //                   <span className="text-zinc-900 dark:text-zinc-100">Activo</span>
        //                 </div>
        //               </div>
    
        //               <div className="flex items-center justify-between gap-2">
        //                 <button
        //                   type="button"
        //                   onClick={handleBackToSettings}
        //                   className="w-full h-10 flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm font-medium rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        //                 >
        //                   Volver a editar
        //                 </button>
        //                 <button
        //                   type="button"
        //                   className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-900 text-white text-sm font-medium rounded-xl transition-colors"
        //                 >
        //                   Ir a mi tienda
        //                 </button>
        //               </div>
        //             </div>
        //           </div>
        //         )}
        //       </div>
        //     )}
        //   </div>
        // </div>
      )
}
export default Stage2
